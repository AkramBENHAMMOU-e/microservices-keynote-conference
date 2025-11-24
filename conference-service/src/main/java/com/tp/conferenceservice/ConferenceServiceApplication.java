package com.tp.conferenceservice;

import com.tp.conferenceservice.entities.Conference;
import com.tp.conferenceservice.entities.Review;
import com.tp.conferenceservice.enums.ConferenceType;
import com.tp.conferenceservice.feign.KeynoteRestClient;
import com.tp.conferenceservice.model.Keynote;
import com.tp.conferenceservice.repository.ConferenceRepository;
import com.tp.conferenceservice.repository.ReviewRepository;
import com.tp.conferenceservice.services.ReviewService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
@EnableFeignClients
public class ConferenceServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConferenceServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ConferenceRepository conferenceRepository, ReviewService reviewRepository, KeynoteRestClient keynoteRestClient){

        return args ->{

            List<Keynote> keynotes = keynoteRestClient.getAllKeynotes();
            System.out.println(keynotes.get(0).getName());



            List<Conference> conferences = List.of(Conference.builder()
                            .id(UUID.randomUUID())
                            .date(LocalDateTime.now())
                            .titre("MultiAgent")
                            .duree(60)
                            .nbreInscrit(200)
                            .score(2)
                            .type(ConferenceType.COMMERCIALE)
                            .keynotes(keynotes)

                    .build(),
                    Conference.builder()
                            .id(UUID.randomUUID())
                            .date(LocalDateTime.now())
                            .titre("l'enseignement moderne")
                            .duree(30)
                            .nbreInscrit(300)
                            .score(4)
                            .type(ConferenceType.ACADEMIQUE)
                            .keynotes(List.of(keynotes.get(0),keynotes.get(1)))
                            .build());
            conferenceRepository.saveAll(conferences);

            List<Review> reviews = List.of(
                    Review.builder()
                            .id(UUID.randomUUID())
                            .texte("Belle conf")
                            .note(5)
                            .date(new Date())
                            .conference(conferences.get(1))
                            .build());
            reviews.forEach(review -> reviewRepository.saveReview(review));

        };
    }

}
