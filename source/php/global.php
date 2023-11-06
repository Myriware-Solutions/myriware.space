<?php

// FUNCTIONS FOR THE GLOBAL FILE

function extractLangFromUrl($url) {
    $parts = parse_url($url);
    $pathSegments = explode('/', $parts['path']);

    // Check if the path has at least two segments
    if (count($pathSegments) >= 2 && $pathSegments[1] === 'public') {
        return $pathSegments[2]; // Assuming LANG is the third segment
    }

    return null; // If the URL doesn't match the expected format
}

// GLOBAL VARIABLES (PER PAGE)

$LANG = extractLangFromUrl($_SERVER['REQUEST_URI']);

?>