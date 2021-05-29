export interface CalendlyHook {
  event: string;
  payload: {
    event_type: {
      uuid: string;
      kind: string;
      slug: string;
      name: string;
      duration: number;
      owner: {
        type: string;
        uuid: string;
      };
    };
    event: {
      uuid: string;
      assigned_to: string[];
      extended_assigned_to: [
        {
          name: string;
          email: string;
          primary: boolean;
        },
      ];
      start_time: string;
      start_time_pretty: string;
      invitee_start_time: string;
      invitee_start_time_pretty: string;
      end_time: string;
      end_time_pretty: string;
      invitee_end_time: string;
      invitee_end_time_pretty: string;
      created_at: string;
      location: string;
      canceled: boolean;
      canceler_name: string;
      cancel_reason: string;
      canceled_at: string;
    };
    invitee: {
      uuid: string;
      first_name: unknown;
      last_name: unknown;
      name: string;
      email: string;
      text_reminder_number: unknown;
      timezone: string;
      created_at: string;
      is_reschedule: boolean;
      payments: [];
      canceled: boolean;
      canceler_name: unknown;
      cancel_reason: unknown;
      canceled_at: unknown;
    };
    questions_and_answers: [];
    questions_and_responses: {};
    tracking: {
      utm_campaign: unknown;
      utm_source: unknown;
      utm_medium: unknown;
      utm_content: unknown;
      utm_term: unknown;
      salesforce_uuid: unknown;
    };
    old_event: unknown;
    old_invitee: unknown;
    new_event: unknown;
    new_invitee: unknown;
  };
  time: string;
}
