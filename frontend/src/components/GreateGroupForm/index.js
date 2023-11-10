import GroupForm from "../GroupForm";

const CreateGroupForm = () => {
  const group = {
    city: '',
    state: '',
    name: '',
    about: '',
    type: '',
    isPrivate: ''
    };


  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <GroupForm
      group={group}
      formType="Create Report"
    />
  );
};

export default CreateGroupForm;
