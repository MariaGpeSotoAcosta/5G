package com.smartcoverage.dto;

public record CoverageFilterInput(
        String provider,
        Integer minSignalStrength,
        String status
) {}
