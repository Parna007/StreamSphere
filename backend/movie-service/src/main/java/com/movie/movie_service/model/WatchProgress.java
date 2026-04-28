package com.movie.movie_service.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "watch_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WatchProgress {

    @Id
    private String id;

    private String userId;

    private String movieId;

    private int progressSeconds;
}