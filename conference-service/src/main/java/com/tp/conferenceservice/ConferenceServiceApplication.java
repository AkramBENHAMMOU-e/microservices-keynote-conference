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
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
@EnableFeignClients
@EnableDiscoveryClient
public class ConferenceServiceApplication {
    private static final Logger log = LoggerFactory.getLogger(ConferenceServiceApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ConferenceServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ConferenceRepository conferenceRepository, ReviewService reviewRepository, KeynoteRestClient keynoteRestClient){

        return args ->{
                List<Keynote> keynotes = keynoteRestClient.getAllKeynotes();

                Keynote first = keynotes.getFirst();
                Keynote second = keynotes.size() > 1 ? keynotes.get(1) : first;

                List<Conference> conferences = List.of(
                        Conference.builder()
                                .id(UUID.randomUUID())
                                .date(new java.sql.Date(2002, 02, 12))
                                .titre("MultiAgent")
                                .duree(60)
                                .nbreInscrit(200)
                                .score(2)
                                .type(ConferenceType.COMMERCIALE)
                                .keynoteIds(keynotes.stream().map(Keynote::getId).toList())
                                .keynotes(keynotes)
                                .build(),
                        Conference.builder()
                                .id(UUID.randomUUID())
                                .date(new java.sql.Date(2002, 02, 12))
                                .titre("l'enseignement moderne")
                                .duree(30)
                                .nbreInscrit(300)
                                .score(4)
                                .type(ConferenceType.ACADEMIQUE)
                                .keynoteIds(List.of(first.getId(), second.getId()))
                                .keynotes(List.of(first, second))
                                .build()
                );
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

                conferenceRepository.saveAll(conferences);


        };
    }

}
