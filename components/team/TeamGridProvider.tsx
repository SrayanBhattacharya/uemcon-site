"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TeamGridContextType {
  hoveredCardId: string | null;
  setHoveredCardId: (id: string | null) => void;
}

const TeamGridContext = createContext<TeamGridContextType>({
  hoveredCardId: null,
  setHoveredCardId: () => {},
});

export function TeamGridProvider({ children }: { children: ReactNode }) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <TeamGridContext.Provider value={{ hoveredCardId, setHoveredCardId }}>
      {children}
    </TeamGridContext.Provider>
  );
}

export function useTeamGrid() {
  return useContext(TeamGridContext);
}
