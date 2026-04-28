package com.movie.movie_service.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "movies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movie {

    @Id
    private String id;

    private String title;

    private String description;

    private String genre;

    private String thumbnailUrl;

    // YouTube OR local video path
    private String videoUrl;

    private boolean trending;

    private int duration; // seconds

    @Builder.Default
    private long views = 0;

    @Builder.Default
    private double rating = 0.0;

    private String videoType; 

}