import { NoteListSection } from "@/components/note-list-section"

type Props = {
    params: {
        userId: string
        directoryId: string
    }
}

export default function Notes({ params }: Props) {
    const { userId, directoryId } = params

    return (
        <main className="p-4 w-full">
            <NoteListSection
                sectionTitle="Últimos 7 días"
                items={[
                    {
                        title: "Nota importante",
                        date: "12/03/2024",
                        subtitle: "Este es un resumen de la nota que se cortará si es muy largo",
                        href: `/personal-notes/${userId}/directories/${directoryId}/note/1`,
                    },
                    {
                        title: "Reunión de equipo",
                        date: "Miércoles",
                        subtitle: "Resumen de reunión con muchos temas a tratar...",
                        href: `/personal-notes/${userId}/directories/${directoryId}/note/2`,
                    },
                    {
                        title: "Recordatorio",
                        date: "10:48",
                        subtitle: "Cita médica con el Dr. Ramírez sobre análisis...",
                        href: `/personal-notes/${userId}/directories/${directoryId}/note/3`,
                    },
                ]}
            />
        </main>
    )
}
