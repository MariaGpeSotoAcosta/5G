package com.smartcoverage.model;

import com.smartcoverage.model.enums.Severity;

import java.time.LocalDateTime;

public class Incident {

    private String id;
    private String title;
    private Severity severity;
    private Double latitude;
    private Double longitude;
    private String description;
    private LocalDateTime createdAt;

    public Incident() {}

    public Incident(String id, String title, Severity severity, Double latitude, Double longitude,
                    String description, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.severity = severity;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.createdAt = createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public Severity getSeverity() { return severity; }
    public Double getLatitude() { return latitude; }
    public Double getLongitude() { return longitude; }
    public String getDescription() { return description; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(String id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setSeverity(Severity severity) { this.severity = severity; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public void setDescription(String description) { this.description = description; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class Builder {
        private String id;
        private String title;
        private Severity severity;
        private Double latitude;
        private Double longitude;
        private String description;
        private LocalDateTime createdAt;

        public Builder id(String id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder severity(Severity severity) { this.severity = severity; return this; }
        public Builder latitude(Double latitude) { this.latitude = latitude; return this; }
        public Builder longitude(Double longitude) { this.longitude = longitude; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Incident build() {
            return new Incident(id, title, severity, latitude, longitude, description, createdAt);
        }
    }
}
