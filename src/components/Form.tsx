import { addLead } from '@/store/leads';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const schema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', title: 'First Name' },
    lastName: { type: 'string', title: 'Last Name' },
    email: { type: 'string', format: 'email', title: 'Email' },
    linkedin: { type: 'string', title: 'LinkedIn' },
    visas: {
      type: 'string',
      title: 'Visas',
      enum: ['O1', 'EB-1A', 'EB-2', "I don't know"]
    },
    country: {
      type: 'string',
      title: 'Country',
      enum: ['USA', 'Ukraine', 'Mexico', "Canada"]
    },
    comments: { type: 'string', title: 'Comments' }
  },
  // required: ['firstName', 'lastName', 'email', 'linkedin', 'visas', 'country', 'comments']
};

const uiSchema = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/firstName' },
    { type: 'Control', scope: '#/properties/lastName' },
    { type: 'Control', scope: '#/properties/email' },
    { type: 'Control', scope: '#/properties/linkedin' },
    {
      type: 'Control',
      scope: '#/properties/visas',
      options: {
        format: 'radio'
      }
    },
    {
      type: 'Control',
      scope: '#/properties/country',
      options: {
        format: 'select'
      }
    },
    {
      type: 'Control',
      scope: '#/properties/comments',
      options: {
        multi: true,
        rows: 10
      }
    }
  ]
};

export default function MyForm() {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>([]);

  const handleChange = ({ data, errors }: any) => {
    // only 
    if (Object.keys(data).length) {
      setData(data);
      setErrors(errors);
    }
  };

  const handleSubmit = () => {
    if (errors.length === 0) {
      const newLead = {
        id: Date.now(),
        name: `${data.firstName} ${data.lastName}`,
        submitted: new Date(),
        country: data.country,
        status: 'PENDING', // NOTE: initial state
      };

      dispatch(addLead(newLead));
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (<div className="text-center">Thank you for your submission!</div>)
  }

  return (
    <div className="max-w-md mx-auto">
      <JsonForms
        schema={schema}
        uischema={uiSchema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full mt-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Submit
      </button>
    </div>
  );
}
