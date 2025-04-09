CREATE OR REPLACE FUNCTION search_tasks(
  search_term text,
  include_attorney boolean DEFAULT false,
  include_client boolean DEFAULT false,
  include_case boolean DEFAULT false,
  include_opposing boolean DEFAULT false,
  include_court boolean DEFAULT false
) RETURNS SETOF tasks AS $$
BEGIN
  RETURN QUERY
  SELECT t.*
  FROM tasks t
  LEFT JOIN matters m ON t.matter_id = m.matter_id
  LEFT JOIN users attorney ON m.assigned_attorney = attorney.user_id
  WHERE 
    -- ✅ Always search by task name, regardless of matter_id
    (t.name ILIKE search_term || '%')

    -- ✅ If matter_id exists AND at least one attribute is true, apply filters
    OR (
      t.matter_id IS NOT NULL
      AND (
        (include_attorney AND attorney.user_name ILIKE search_term || '%')
        OR (include_client AND m.client ILIKE search_term || '%')
        OR (include_case AND m.name ILIKE search_term || '%')
        OR (include_opposing AND m.opposing_council->>'name' ILIKE search_term || '%')
        OR (include_court AND m.court->>'name' ILIKE search_term || '%')
      )
    );
END;
$$ LANGUAGE plpgsql;
