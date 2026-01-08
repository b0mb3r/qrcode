type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  url: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 mx-auto mb-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <title>URL Icon</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  ),

  text: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 mx-auto mb-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <title>Text Icon</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h7"
      />
    </svg>
  ),
  vcard: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 mx-auto mb-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <title>VCard Icon</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
      />
    </svg>
  ),
  email: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 mx-auto mb-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <title>Mail Icon</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  sms: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 mx-auto mb-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <title>SMS Icon</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
      />
    </svg>
  ),
  wifi: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 mx-auto mb-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <title>Wifi Icon</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
      />
    </svg>
  ),
  pix: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 mx-auto mb-1"
      fill="none"
      viewBox="0 0 50 50"
      stroke="currentColor"
      {...props}
    >
      <title>PIX Icon</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M 25 0.046875 C 22.924964 0.046875 20.850972 0.83457408 19.273438 2.4121094 L 2.4121094 19.271484 C -0.7429612 22.426555 -0.7429612 27.571493 2.4121094 30.726562 L 19.273438 47.587891 C 22.42773 50.742184 27.57227 50.742184 30.726562 47.587891 L 47.587891 30.728516 C 50.742961 27.573445 50.742961 22.428507 47.587891 19.273438 L 30.728516 2.4121094 C 29.15098 0.83457408 27.075036 0.046875 25 0.046875 z M 25 2.0332031 C 26.558964 2.0332031 28.118988 2.6307072 29.314453 3.8261719 L 38.486328 13 L 37.070312 13 C 35.479355 13 33.953288 13.631896 32.828125 14.755859 A 1.0001 1.0001 0 0 0 32.828125 14.757812 L 26.060547 21.525391 C 25.466839 22.119099 24.532404 22.119686 23.9375 21.525391 L 17.169922 14.757812 C 16.046276 13.632967 14.520644 13 12.929688 13 L 11.511719 13 L 20.6875 3.8261719 C 21.882965 2.6307072 23.441036 2.0332031 25 2.0332031 z M 9.5117188 15 L 12.929688 15 C 13.99073 15 15.007506 15.420769 15.755859 16.169922 A 1.0001 1.0001 0 0 0 15.755859 16.171875 L 22.523438 22.939453 C 23.882532 24.297158 26.116318 24.297745 27.474609 22.939453 L 34.242188 16.171875 C 34.993023 15.421792 36.00927 15 37.070312 15 L 40.486328 15 L 46.173828 20.6875 C 48.564758 23.078429 48.564758 26.923524 46.173828 29.314453 L 40.488281 35 L 37.070312 35 C 36.00927 35 34.993023 34.578161 34.242188 33.828125 L 27.474609 27.060547 C 26.795464 26.381401 25.897789 26.042986 25 26.042969 C 24.102211 26.042952 23.202984 26.381695 22.523438 27.060547 L 15.755859 33.828125 A 1.0001 1.0001 0 0 0 15.755859 33.830078 C 15.007506 34.579184 13.99073 35 12.929688 35 L 9.5136719 35 L 3.8261719 29.3125 C 1.4352424 26.921571 1.4352424 23.076476 3.8261719 20.685547 L 9.5117188 15 z M 25 28.029297 C 25.382185 28.02937 25.763693 28.177755 26.060547 28.474609 L 32.828125 35.242188 A 1.0001 1.0001 0 0 0 32.828125 35.244141 C 33.953288 36.368057 35.479355 37 37.070312 37 L 38.488281 37 L 29.3125 46.173828 C 26.922793 48.563535 23.077207 48.563535 20.6875 46.173828 L 11.513672 37 L 12.929688 37 C 14.520644 37 16.046276 36.367033 17.169922 35.242188 L 23.9375 28.474609 C 24.234952 28.177462 24.617815 28.029224 25 28.029297 z"
      />
    </svg>
  ),
}
