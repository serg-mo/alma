import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { useState } from 'react';

// Update the schema for visas
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
      enum: ['A', 'B', 'C']
    },
    resume: { type: 'string', format: 'data-url', title: 'Resume / CV' },
    comments: { type: 'string', title: 'Comments' }
  },
  required: ['firstName', 'lastName', 'email', 'linkedin', 'visas', 'resume', 'comments']
};

// Update the uischema for visas to use radio buttons
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
    { type: 'Control', scope: '#/properties/resume' },
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

  return (
    <div className="flex justify-center items-center min-h-screen">
      {submitted ? (
        <div className="text-center">Thank you for your submission!</div>
      ) : (
        <div className="w-full max-w-lg p-6 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Application Form</h1>
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
        </div>
      )}
    </div>
  );
}
