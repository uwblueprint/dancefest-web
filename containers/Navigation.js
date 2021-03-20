import { useState, useEffect } from 'react'; // React
import { createContainer } from 'unstated-next'; // Unstated Next

const useNavigation = () => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const sessionEvent = JSON.parse(sessionStorage.getItem('event'));
    if (sessionEvent !== null) {
      setEvent(sessionEvent);
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
