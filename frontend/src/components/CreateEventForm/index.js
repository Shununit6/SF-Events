import EventForm from "../EventForm";

const CreateEventForm = () => {
  const event = {
    name: '',
    type: '',
    capacity: '',
    price: '',
    startDate: '',
    endDate: '',
    imageUrl: '',
    description: ''
    };


  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <EventForm
      event={event}
      formType="Create Event"
    />
  );
};

export default CreateEventForm;
