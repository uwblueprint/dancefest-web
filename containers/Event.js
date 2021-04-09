import useSessionStorage from '@utils/useSessionStorage'; // useSessionStorage
import { createContainer } from 'unstated-next'; // Unstated Next

const useEvent = () => {
  const [event, setEvent] = useSessionStorage('event', null);

  return [event, setEvent];
};

export default createContainer(useEvent);
