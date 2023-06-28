import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

function BHNFavoriteIcon({ color, size }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
  };

  const iconStyle = {
    color: color || (isFavorite ? 'secondary' : 'action'),
    fontSize: size || 'default',
  };

  return (
    <div>
      <Typography component="legend">Add to Favorites</Typography>
      <FavoriteIcon style={iconStyle} onClick={handleAddToFavorites} />
    </div>
  );
}

export default BHNFavoriteIcon;
