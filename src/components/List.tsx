import { Lead, toggleStatus } from '@/store/leads';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

export default function List() {
  const dispatch = useDispatch<AppDispatch>();
  const leads = useSelector((state: RootState) => state.leads.leads);

  const handleClick = (id: number) => {
    dispatch(toggleStatus(id));
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
              <a onClick={() => handleClick(id)} className='cursor-pointer bg-gray-300 rounded-full px-2 py-1'>{status}</a>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};