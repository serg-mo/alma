import moment from 'moment';
import { useState } from 'react';
import { STATUSES } from "../constants";

interface Lead {
  id: number;
  name: string;
  submitted: Date;
  country: string;
  status: string;
}

const initialLeads: Lead[] = [
  { id: 1, name: 'John Doe', submitted: new Date(), country: "Ukraine", status: STATUSES.PENDING },
  { id: 2, name: 'Jane Smith', submitted: new Date(), country: "Poland", status: STATUSES.REACHED_OUT },
  { id: 3, name: 'Bob Johnson', submitted: new Date(), country: "Lithuania", status: STATUSES.PENDING },
];


export default function List() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const handleClick = (id: number) => {
    setLeads(leads.map(lead =>
      lead.id === id
        ? { ...lead, status: lead.status === STATUSES.PENDING ? STATUSES.REACHED_OUT : STATUSES.PENDING }
        : lead
    ));
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 text-gray-500">
      <thead className="bg-gray-50 text-xs font-medium uppercase tracking-wider">
        <tr>
          <th className="px-6 py-3 text-left">Name</th>
          <th className="px-6 py-3 text-left">Submitted</th>
          <th className="px-6 py-3 text-left">Status</th>
          <th className="px-6 py-3 text-left">Country</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 text-sm font-medium">
        {leads.map(({ id, name, submitted, status, country }: Lead) => (
          <tr key={id}>
            <td className="px-6 py-4 whitespace-nowrap">{name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{moment(submitted).format('MM/DD/YYYY, h:mmA')}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <a onClick={() => handleClick(id)} className='cursor-pointer'>{status}</a>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};