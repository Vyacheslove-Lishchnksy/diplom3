"use client";

import HeaderUI from "@/src/components/UI/HeaderUI";
import InputUI from "@/src/components/UI/InputUI/InputUI";
import SelectUI from "@/src/components/UI/SelectionUI";
import { BigButtonUI } from "@/src/components/UI/BigButtonUI";
import ErrorTextUI from "@/src/components/UI/ErrorTextUI";
import { noteDurationList } from "@/src/configs/redactorConfig";
import RedactorApp from "./RedactorApp";
import { useRedactor } from "@/src/hooks/useRedactor";

const Redactor = () => {
  const {
    name,
    tempo,
    noteDuration,
    currentCode,
    isNameError,
    handleNameChange,
    setTempo,
    setNoteDuration,
    handleCreate,
  } = useRedactor();

  return (
    <>
      <div className="mb-24">
        <HeaderUI>Redactor</HeaderUI>
      </div>

      <section className="flex gap-4 h-8" style={{ marginBottom: "24px" }}>
        <div className="relative">
          <InputUI
            placeholder="Title"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <ErrorTextUI isErrorValue={isNameError}>
            track with this title already exists
          </ErrorTextUI>
        </div>
        <InputUI
          placeholder="Duration"
          value={tempo}
          onChange={(e) => setTempo(Number(e.target.value))}
          style={{ height: "26px" }}
        />

        <SelectUI
          list={noteDurationList}
          value={noteDuration}
          onChange={(e) => setNoteDuration(Number(e.target.value))}
          style={{ height: "24px", padding: "0" }}
        />
      </section>

      <RedactorApp />

      <InputUI
        className="w-full"
        style={{ marginBlock: "10px" }}
        value={currentCode}
        readOnly
      />

      <BigButtonUI onClick={handleCreate} disabled={isNameError}>
        Create
      </BigButtonUI>
    </>
  );
};

export default Redactor;
