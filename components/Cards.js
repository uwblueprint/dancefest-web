import dayjs from "dayjs"; // Date parsing
import { useRouter } from "next/router"; // Routing (with buttons)
import styles from "@styles/components/Cards.module.scss"; // Component styles

/**
 * Individual cards for event page
 * @param {Object} event details
 * @param {Boolean} isAdmin representing editable status
 * @param {Function} openEditModal to open and close edit modal
 * @returns {HTMLElement} individual event card
 */
function EventCard({ event, isAdmin, openEditModal }) {
  const router = useRouter(); // Collect router

  /**
   * Handles event card click
   * @param {Event} e event
   */
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default synthetic vent
    router.push(`/event/${event.id}`); // Route to "/event/:id" page
  };

  return (
    // Card wrapper with two childs (event + edit)
    <div className={styles.card__event_wrapper}>
      {/* Card: Event details */}
      <button
        className={`${styles.card__event} ${
          // If admin, change sizing of element
          isAdmin ? styles.card__event_partial : styles.card__event_full
        }`}
        onClick={handleClick}
      >
        {/* Event title */}
        <h3>{event.name}</h3>

        {/* Event statistics */}
        <div className={styles.card__event_stats}>
          {/* Event date */}
          <span>
            {event.event_date
              ? dayjs(event.event_date).format("MM/DD/YYYY")
              : ""}
          </span>

          {/* Event number of performances */}
          <span>{event.num_performances} Performances</span>
        </div>

        {/* Event judges */}
        <div className={styles.card__event_judges}>
          <h4>JUDGES:</h4>

          <ul>
            {event.judges.map((judge, i) => {
              // For each judge in judges array, render email
              return <li key={i}>{judge}</li>;
            })}
          </ul>
        </div>
      </button>

      {isAdmin ? (
        // If admin with editing permissions, also show edit button
        <button
          className={styles.card__event_edit}
          onClick={() => openEditModal()}
        >
          Edit Event
        </button>
      ) : null}
    </div>
  );
}

// Export cards
export { EventCard };
