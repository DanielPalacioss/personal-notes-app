import {Note, NoteSection} from "@/interfaces/api";

export function filterNotesByDateRange(notes: Note[], userId: string, directoryId: string): NoteSection {
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);

    const noteSection: NoteSection = {};
    notes.forEach(note => {
        note.href = `/personal-notes/${userId}/directories/${directoryId}/note/${note.id}`;
        const updatedAt = new Date(note.updatedAt);
        note.updatedAt = note.updatedAt.slice(0, 9);
        if (updatedAt > sevenDaysAgo) {
            if (!noteSection['Last 7 days']) noteSection['Last 7 days'] = [];
            note.href = `/personal-notes/${userId}/directories/${directoryId}/note/${note.id}`;
            const opciones: Intl.DateTimeFormatOptions = {weekday: 'long'};
            note.updatedAt = updatedAt.toLocaleDateString('es-ES', opciones);
            noteSection['Last 7 days'].push(note)
        } else if (updatedAt > thirtyDaysAgo) {
            if (!noteSection['Last 30 days']) noteSection['Last 30 days'] = [];
            noteSection['Last 30 days'].push(note);
        } else if (updatedAt.getFullYear() === currentDate.getFullYear()) {
            const monthName = updatedAt.toLocaleString('en-US', {month: 'long'});
            if (!noteSection[monthName]) noteSection[monthName] = [];
            noteSection[monthName].push(note);
        } else {
            const year = updatedAt.getFullYear().toString();
            if (!noteSection[year]) noteSection[year] = [];
            noteSection[year].push(note);
        }

    });
    return noteSection;
}