import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { useState } from 'react';

const schema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', title: 'First Name' },
    lastName: { type: 'string', title: 'Last Name' },
    email: { type: 'string', format: 'email', title: 'Email' },
    linkedin: { type: 'string', title: 'LinkedIn' },
    visas: {
      type: 'string',
      title: 'Visas you are interested in',
      enum: ['O1', 'EB-1A', 'EB-2', "I don't know"]
    },
    // resume: { type: 'string', format: 'data-url', title: 'Resume / CV' },
    comments: { type: 'string', title: 'Comments' }
  },
  // required: ['firstName', 'lastName', 'email', 'linkedin', 'visas', 'resume', 'comments']
};

const uischema = {
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
    // { type: 'Control', scope: '#/properties/resume' },
    { type: 'Control', scope: '#/properties/comments' }
  ]
};

export default function MyForm() {
  const [data, setData] = useState<any>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (data: any) => {
    setData(data);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (<div className="text-center">Thank you for your submission!</div>)
  }

  return (
    <>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => handleChange(data)}
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full mt-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Submit
      </button>
    </>
  );
}
