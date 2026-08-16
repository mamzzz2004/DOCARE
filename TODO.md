# Auto Detect Location in Registration

## Tasks
- [x] Add "Auto Detect Location" button next to address field in register.html
- [x] Implement JavaScript for geolocation API to get current position
- [x] Add reverse geocoding using OpenStreetMap Nominatim API
- [x] Fill address textarea with detected location
- [x] Handle errors (geolocation denied, geocoding failure) with user alerts
- [x] Optimize performance (reduced timeouts to 5 seconds)
- [x] Test the functionality (user tested and reported slow detection, optimized timeouts)

## Notes
- Uses browser's navigator.geolocation for location
- Reverse geocodes via https://nominatim.openstreetmap.org/reverse
- Address field remains editable if auto-detection fails or user wants to change
- Implementation complete and optimized for faster response
