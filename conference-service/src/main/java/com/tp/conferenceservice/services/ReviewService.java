package com.tp.conferenceservice.services;

import com.tp.conferenceservice.entities.Review;
import com.tp.conferenceservice.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReviewService {

    private ReviewRepository reviewRepository;

    public Review saveReview(Review review){
        if(review.getNote() >= 0 && review.getNote() <= 5){
            return reviewRepository.save(review);
        }
        else{
            throw new IllegalArgumentException("Note must be between 0 and 5");
        }

    }
}
