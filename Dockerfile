# Production-ready, lightweight Dockerfile using Nginx Alpine
FROM nginx:alpine

# Metadata
LABEL maintainer="Ehsan Lak <ehsanlak279@gmail.com>"
LABEL description="Official Interactive Portfolio of Ehsan Lak - AI & Robotics Researcher"

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static website files
COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY .nojekyll /usr/share/nginx/html/

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
