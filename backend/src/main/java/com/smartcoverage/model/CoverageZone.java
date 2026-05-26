package com.smartcoverage.model;

import com.smartcoverage.model.enums.ZoneStatus;

public class CoverageZone {

    private String id;
    private String zoneName;
    private Integer signalStrength;
    private String provider;
    private Double latitude;
    private Double longitude;
    private ZoneStatus status;

    public CoverageZone() {}

    public CoverageZone(String id, String zoneName, Integer signalStrength, String provider,
                        Double latitude, Double longitude, ZoneStatus status) {
        this.id = id;
        this.zoneName = zoneName;
        this.signalStrength = signalStrength;
        this.provider = provider;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
    }

    public static Builder builder() { return new Builder(); }

    public String getId() { return id; }
    public String getZoneName() { return zoneName; }
    public Integer getSignalStrength() { return signalStrength; }
    public String getProvider() { return provider; }
    public Double getLatitude() { return latitude; }
    public Double getLongitude() { return longitude; }
    public ZoneStatus getStatus() { return status; }

    public void setId(String id) { this.id = id; }
    public void setZoneName(String zoneName) { this.zoneName = zoneName; }
    public void setSignalStrength(Integer signalStrength) { this.signalStrength = signalStrength; }
    public void setProvider(String provider) { this.provider = provider; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public void setStatus(ZoneStatus status) { this.status = status; }

    public static class Builder {
        private String id;
        private String zoneName;
        private Integer signalStrength;
        private String provider;
        private Double latitude;
        private Double longitude;
        private ZoneStatus status;

        public Builder id(String id) { this.id = id; return this; }
        public Builder zoneName(String zoneName) { this.zoneName = zoneName; return this; }
        public Builder signalStrength(Integer signalStrength) { this.signalStrength = signalStrength; return this; }
        public Builder provider(String provider) { this.provider = provider; return this; }
        public Builder latitude(Double latitude) { this.latitude = latitude; return this; }
        public Builder longitude(Double longitude) { this.longitude = longitude; return this; }
        public Builder status(ZoneStatus status) { this.status = status; return this; }

        public CoverageZone build() {
            return new CoverageZone(id, zoneName, signalStrength, provider, latitude, longitude, status);
        }
    }
}
