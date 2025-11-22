package com.tp.conferenceservice.entities;

import com.tp.conferenceservice.enums.ConferenceType;
import com.tp.conferenceservice.model.Keynote;
import jakarta.persistence.*;
import lombok.*;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
@Entity @Builder @AllArgsConstructor @NoArgsConstructor @Getter @Setter
public class Conference {
    @Id
    private UUID id;
    private String titre;
    @Enumerated(EnumType.STRING)
    private ConferenceType type;
    private Date date;
    private Duration duree;
    private int nbreInscrit;
    private float score;
    @OneToMany(mappedBy = "conference", fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();
    @Transient
    private List<Keynote> keynotes = new ArrayList<>();

}

