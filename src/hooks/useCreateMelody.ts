import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instanceMelodiesDatabase } from "../api/Database";
import { RTTTLMelody } from "../configs/default_melodies";

interface UseCreateMelodyOptions {
  onSuccess?: (melody: RTTTLMelody) => void;
}

export const useCreateMelody = ({ onSuccess }: UseCreateMelodyOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (melody: RTTTLMelody) => {
      if (melody.id) {
        throw new Error("A melody with an id cannot be created.");
      }

      const response = await instanceMelodiesDatabase.createMelody(melody);
      if (!response?.ok) {
        throw new Error("Could not create melody.");
      }

      return (await response.json()) as RTTTLMelody;
    },
    onSuccess: async (melody) => {
      await queryClient.invalidateQueries({ queryKey: ["currentList"] });
      onSuccess?.(melody);
    },
  });
};
