import { STATUSES } from '@/constants';
import { addLead } from '@/store/leads';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { ErrorObject } from 'ajv';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'linkedin', 'visas', 'country'];

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
  const [additionalErrors, setAdditionalErrors] = useState<ErrorObject[]>([]);

  const validate = () => {
    const errors: ErrorObject[] = [];

    REQUIRED_FIELDS.forEach(field => {
      if (!data[field] || data[field].trim() === '') {
        errors.push({
          instancePath: `/${field}`,
          message: `${field} is required`,
          schemaPath: '',
          keyword: '',
          params: {},
        });
      }
    });

    if (errors.length > 0) {
      setAdditionalErrors(errors);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      const newLead = {
        id: Date.now(),
        name: `${data.firstName} ${data.lastName}`,
        submitted: moment().format('MM/DD/YYYY, h:mmA'),
        country: data.country,
        status: STATUSES.PENDING, // NOTE: initial state
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
        onChange={({ data }) => setData(data)}
        validationMode="NoValidation"
        additionalErrors={additionalErrors}
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
