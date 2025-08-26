import { images } from '@/constants';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  // Ensure rating is between 0 and 5
  const clampedRating = Math.max(0, Math.min(5, rating));
  
  // Create array of 5 stars
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starIndex = index + 1;
    
    if (clampedRating >= starIndex) {
      // Full star
      return 'full';
    } else if (clampedRating >= starIndex - 0.5) {
      // Half star (for decimal ratings)
      return 'half';
    } else {
      // Empty star
      return 'empty';
    }
  });

  return (
    <View className="flex-row items-center gap-1">
      {stars.map((starType, index) => (
        <Image
          key={index}
          source={images.star}
          className="size-4"
          tintColor={starType === 'empty' ? '#E5E5E5' : '#FFD700'}
          style={{
            opacity: starType === 'empty' ? 0.3 : 1
          }}
        />
      ))}
      <Text className="text-sm font-medium text-gray-600 ml-1">
        {clampedRating.toFixed(1)}/5
      </Text>
    </View>
  );
};

export default Rating;
