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

    private String videoUrl;

    private boolean trending;
}
