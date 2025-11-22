package com.tp.conferenceservice.web;

import com.tp.conferenceservice.entities.Review;
import com.tp.conferenceservice.repository.ReviewRepository;
import com.tp.conferenceservice.services.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class ReviewController {

    private ReviewService reviewService;
    private ReviewRepository reviewRepository;


    @GetMapping("/reviews/{id}")
    public Review getReviewById(@PathVariable UUID id) {
        return reviewRepository.findById(id).get();
    }


    @PostMapping("/reviews")
    public Review saveReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    @PutMapping("/reviews/{id}")
    public Review updateReview(@PathVariable UUID id, @RequestBody Review review) {
        Review r = reviewRepository.findById(id).get();
        r.setTexte(review.getTexte());
        r.setNote(review.getNote());
        r.setDate(review.getDate());
        r.setConference(review.getConference());
        return reviewRepository.save(r);
    }

    @DeleteMapping("/reviews/{id}")
    public void deleteReview(@PathVariable UUID id) {
        reviewRepository.deleteById(id);
    }
}
