import React, { useEffect, useState } from 'react';
import EventForm from "../EventForm";
import { useSelector, useDispatch } from 'react-redux';
import { getAllGroups} from '../../store/groups';
const CreateEventForm = () => {
  const event = {
    name: '',
    type: '',
    capacity: '',
    price: '',
    startDate: '',
    endDate: '',
    imageUrl: '',
    description: '',
    venueId:'',
    };
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const groups = useSelector((state) => state.groups);
    useEffect(()=>{
      dispatch(getAllGroups()).then(()=>setIsLoaded(true))
    }, [dispatch]);

  if (!isLoaded) {
    return (<div>Loading...</div>);
  }
  // console.log(groups);
  if(isLoaded){

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <EventForm
      groups={Object.values(groups)}
      event={event}
      formType="Create Event"
    />
  );}
};

export default CreateEventForm;
