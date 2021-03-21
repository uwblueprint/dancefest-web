import { useState, useEffect } from 'react'; // React
import { createContainer } from 'unstated-next'; // Unstated Next

const useNavigation = () => {
  const [event, setEvent] = useState(0);

  useEffect(() => {
    const sessionEvent = JSON.parse(sessionStorage.getItem('event'));
    if (sessionEvent !== null) {
      setEvent(sessionEvent);
    } else {
      setEvent(null);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('event', JSON.stringify(event));
  }, [event]);

  return {
    event,
    setEvent,
  };
};

export default createContainer(useNavigation);
