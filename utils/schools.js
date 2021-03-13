/**
 * Formats schools response from /api/schools to a format that is easy to use with Table component
 * Removes unnecessary fields and converts all field names to camelCase
 * @param {Object[]} schools - Schools returned in the response
 * @returns {Object[]} Formatted schools
 */
export const formatSchools = schools => {
  return schools.map(
    ({ contact_name: contactName, email, id, phone, school_name: schoolName }) => ({
      contactName,
      email,
      id,
      phone,
      schoolName,
    })
  );
};
