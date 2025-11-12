package com.tp.conferenceservice.entities;

import com.tp.conferenceservice.enums.ConferenceType;
import jakarta.persistence.*;
import lombok.*;

import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.UUID;
@Entity @Builder @AllArgsConstructor @NoArgsConstructor @Getter @Setter
public class Conference {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String titre;
    private ConferenceType type;
    private Date date;
    private Duration duree;
    private int nbreInscrit;
    private float score;
    @OneToMany(mappedBy = "conference", fetch = FetchType.LAZY)
    private List<Review> review;
}

