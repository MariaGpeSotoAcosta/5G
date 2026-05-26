package com.smartcoverage.model;

import com.smartcoverage.model.enums.TowerStatus;

public class Tower {

    private String id;
    private String provider;
    private Double height;
    private Double latitude;
    private Double longitude;
    private TowerStatus status;

    public Tower() {}

    public Tower(String id, String provider, Double height, Double latitude, Double longitude, TowerStatus status) {
        this.id = id;
        this.provider = provider;
        this.height = height;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
    }

    public static Builder builder() { return new Builder(); }

    public String getId() { return id; }
    public String getProvider() { return provider; }
    public Double getHeight() { return height; }
    public Double getLatitude() { return latitude; }
    public Double getLongitude() { return longitude; }
    public TowerStatus getStatus() { return status; }

    public void setId(String id) { this.id = id; }
    public void setProvider(String provider) { this.provider = provider; }
    public void setHeight(Double height) { this.height = height; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public void setStatus(TowerStatus status) { this.status = status; }

    public static class Builder {
        private String id;
        private String provider;
        private Double height;
        private Double latitude;
        private Double longitude;
        private TowerStatus status;

        public Builder id(String id) { this.id = id; return this; }
        public Builder provider(String provider) { this.provider = provider; return this; }
        public Builder height(Double height) { this.height = height; return this; }
        public Builder latitude(Double latitude) { this.latitude = latitude; return this; }
        public Builder longitude(Double longitude) { this.longitude = longitude; return this; }
        public Builder status(TowerStatus status) { this.status = status; return this; }

        public Tower build() {
            return new Tower(id, provider, height, latitude, longitude, status);
        }
    }
}
