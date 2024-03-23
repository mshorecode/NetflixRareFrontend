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
      className="flex text-center mr-2 rounded-sm px-[5px] py-[3px]"
      id={`tag-${tag.id}`}
    >
      {tag.label}
    </Badge>
  );
}

TagBadge.propTypes = {
  id: PropTypes.number.isRequired,
};
