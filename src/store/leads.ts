import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Lead {
  id: number;
  name: string;
  submitted: Date;
  country: string;
  status: string;
}

interface LeadsState {
  leads: Lead[];
}

const initialState: LeadsState = { leads: [] };

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    toggleStatus: (state, action: PayloadAction<number>) => {
      const lead = state.leads.find(lead => lead.id === action.payload);
      if (lead) {
        lead.status = lead.status === 'PENDING' ? 'REACHED_OUT' : 'PENDING';
      }
    },
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload);
    }
  }
});

export const { toggleStatus, addLead } = leadsSlice.actions;

export default leadsSlice.reducer;
