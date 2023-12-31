"use client";

import { FC, useEffect, useMemo, useState } from "react";
// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
import useClipboard from "react-use-clipboard";
import { fetchData } from "./scripts/action";
import { Button } from "./comps/button";
import { simplifyHTML } from "./scripts/reduce";

declare function IUseFormState<State, Payload>(
  action: (state: State, payload: Payload) => Promise<State>,
  initialState: State,
  permalink?: string
): [state: State, dispatch: (payload: Payload) => void];

export const View: FC = () => {
  const [state, formAction] = (useFormState as typeof IUseFormState)(fetchData, {
    data: null,
    error: null,
  });

  const data = useMemo(() => {
    if (!state.data) return null;
    const simplified = simplifyHTML(state.data);
    if (!simplified) return null;
    return JSON.stringify(simplified, null, 2);
  }, [state.data]);

  const [isCopied, setCopied] = useClipboard(data || "null", {
    successDuration: 2000,
  });
  const [isCopiedMin, setCopiedMin] = useClipboard(JSON.stringify(JSON.parse(data || "null")), {
    successDuration: 2000,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.data || state.error) setLoading(false);
  }, [state]);

  return (
    <form
      action={formAction}
      onSubmit={e => {
        setLoading(true);
        if (loading) {
          e.preventDefault();
          return;
        }
      }}
    >
      <div className="flex row center">
        <input
          required
          defaultValue="https://github.com/muzam1l"
          name="url"
          type="url"
          placeholder="Paste the page link."
          className="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <Button loading={loading} type="submit">
          Submit
        </Button>
      </div>
      <pre>
        {state.error && <div className="error flex center">{state.error}</div>}

        {data && (
          <div className="flex row">
            <button onClick={setCopied}>{isCopied ? "copied!" : "copy to clipboard"}</button>
            <hr />
            <button onClick={setCopiedMin}>{isCopiedMin ? "copied!" : "copy minified"}</button>
          </div>
        )}
        {data}
      </pre>
    </form>
  );
};
