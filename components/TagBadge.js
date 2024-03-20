import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getTagById } from '../api/tagsAPI';

export default function TagBadge({ id }) {
  const [tag, setTag] = useState({});

  useEffect(() => {
    getTagById(id).then(setTag);
  }, [id]);

  return (
    <Badge
      className="flex text-center align-middle justify-center"
      id={`tag-${tag.id}`}
    >
      {tag.label}
    </Badge>
  );
}

TagBadge.propTypes = {
  id: PropTypes.number.isRequired,
};
