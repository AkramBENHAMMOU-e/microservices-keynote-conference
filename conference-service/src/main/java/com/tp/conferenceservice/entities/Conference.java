package com.tp.conferenceservice.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tp.conferenceservice.enums.ConferenceType;
import com.tp.conferenceservice.model.Keynote;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Entity @Builder @AllArgsConstructor @NoArgsConstructor @Getter @Setter
public class Conference {
    @Id
    private UUID id;
    private String titre;
    @Enumerated(EnumType.STRING)
    private ConferenceType type;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private Integer duree;
    private int nbreInscrit;
    private float score;
    @OneToMany(mappedBy = "conference", fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();
    @Transient
    private List<Keynote> keynotes = new ArrayList<>();

}

