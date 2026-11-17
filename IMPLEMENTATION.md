# Current website implementation

The current scope is a static, browser-local travel website. Packages, rides, About and My Trips are the main navigation items. Eight proposed packages cover Jaipur, Darjeeling, Sikkim and Meghalaya. Unwatermarked Unsplash photographs illustrate the regional sights on Home, package cards and details. Enquiries are drafted in WhatsApp; visitors record organiser-confirmed bookings under Booked trips themselves. My Trips also holds enquiry drafts, past trips and local group plans.

The application does not require accounts, a shared database, provider configuration or server API credentials. The static build is deployed from `dist`. About includes reserved, clearly labelled video-testimonial spaces until actual clips are supplied in the content file.

Existing private local files are retained and are never copied into the deployment. Compatible earlier records can be converted with the optional local export script. No external resources or hosted data are deleted. New local records are validated and backed up through export/import. Group planning and integer-paise expense splitting remain available on the same browser.

The local booking status is explicitly self-recorded, and WhatsApp draft creation is not represented as a confirmed booking or sent message. Availability, prices, payment and cancellation arrangements are made directly with the organisers.
