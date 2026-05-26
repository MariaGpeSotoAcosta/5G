package com.smartcoverage.repository;

import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.smartcoverage.dto.IncidentFilterInput;
import com.smartcoverage.model.Incident;
import com.smartcoverage.model.enums.Severity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class IncidentRepository {

    private static final Logger log = LoggerFactory.getLogger(IncidentRepository.class);
    private static final String COLLECTION = "incidents";

    private final Firestore firestore;

    public IncidentRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    public List<Incident> findAll(IncidentFilterInput filter) {
        try {
            Query query = firestore.collection(COLLECTION);

            if (filter != null && filter.severity() != null && !filter.severity().isBlank()) {
                query = query.whereEqualTo("severity", filter.severity().toUpperCase());
            }

            QuerySnapshot snapshot = query.get().get();
            List<Incident> incidents = snapshot.getDocuments().stream()
                    .map(this::toModel)
                    .toList();

            // Text search applied in memory
            if (filter != null && filter.text() != null && !filter.text().isBlank()) {
                String searchTerm = filter.text().toLowerCase();
                incidents = incidents.stream()
                        .filter(i -> containsText(i, searchTerm))
                        .toList();
            }

            return incidents;
        } catch (InterruptedException | ExecutionException e) {
            log.error("Error fetching incidents from Firestore", e);
            Thread.currentThread().interrupt();
            return List.of();
        }
    }

    private boolean containsText(Incident incident, String term) {
        return (incident.getTitle() != null && incident.getTitle().toLowerCase().contains(term))
                || (incident.getDescription() != null && incident.getDescription().toLowerCase().contains(term));
    }

    private Incident toModel(DocumentSnapshot doc) {
        String createdAtStr = doc.getString("createdAt");
        LocalDateTime createdAt = null;
        if (createdAtStr != null) {
            try {
                createdAt = LocalDateTime.parse(createdAtStr, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            } catch (Exception e) {
                log.warn("Could not parse createdAt '{}' for incident {}", createdAtStr, doc.getId());
            }
        }

        return Incident.builder()
                .id(doc.getId())
                .title(doc.getString("title"))
                .severity(parseEnum(doc.getString("severity"), Severity.class))
                .latitude(doc.getDouble("latitude"))
                .longitude(doc.getDouble("longitude"))
                .description(doc.getString("description"))
                .createdAt(createdAt)
                .build();
    }

    private <T extends Enum<T>> T parseEnum(String value, Class<T> enumClass) {
        if (value == null) return null;
        try {
            return Enum.valueOf(enumClass, value.toUpperCase());
        } catch (IllegalArgumentException e) {
            log.warn("Unknown enum value '{}' for {}", value, enumClass.getSimpleName());
            return null;
        }
    }
}
