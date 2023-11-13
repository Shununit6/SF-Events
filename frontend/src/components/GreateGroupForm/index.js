import GroupForm from "../GroupForm";

const CreateGroupForm = () => {
  const group = {
    city: '',
    state: '',
    location: '',
    name: '',
    about: '',
    type: '',
    isPrivate: ''
    };


  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <GroupForm
      group={group}
      formType="Create Group"
    />
  );
};

export default CreateGroupForm;
