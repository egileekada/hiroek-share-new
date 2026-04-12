import { create } from 'zustand';  
import type { IEvent } from '../model/event';
 
type EventState = {   
    event: IEvent 
    createdEvent: IEvent
}

type Action = {  
    updateEvent: (data: EventState['event']) => void  
    updateCreateEvent: (data: EventState['createdEvent']) => void  
}

export const useEventDetail = create<EventState & Action>((set) => ({ 
    event: {} as any, 
    createdEvent: {} as any, 
    updateEvent: (data: any) => set(() => ({ event: data })), 
    updateCreateEvent: (data: any) => set(() => ({ createdEvent: data })), 
}));