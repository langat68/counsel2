import { useState } from "react";
import { DashboardLayout } from "../Layout/DashBoardLayout"; // update path if needed
import { CaseNote, Client } from "@/types";
import "./Notes.scss"
import {
    Search,
    Plus,
    FileText,
    Calendar,
    Tag,
    Eye,
    EyeOff,
    Edit2,
} from "lucide-react";
import { format } from "date-fns";
import "./Notes.scss";

export default function Notes() {
    const [search, setSearch] = useState("");
    const [selectedNote, setSelectedNote] = useState<CaseNote | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Placeholder data
    const notes: CaseNote[] = [];
    const clients: Client[] = [];

    const filteredNotes = notes.filter((note) => {
        const term = search.toLowerCase();
        return (
            note.title.toLowerCase().includes(term) ||
            note.content.toLowerCase().includes(term) ||
            note.tags.some((tag) => tag.toLowerCase().includes(term))
        );
    });

    const getClientName = (id: string) =>
        clients.find((c) => c.id === id)?.name || "Unknown Client";

    return (
        <DashboardLayout title="Case Notes" subtitle="Document and track case progress">
            <div className="notes">
                {/* Left List */}
                <div className="notes-list">
                    <div className="card notes-card">
                        <div className="card-header">
                            <div className="header-top">
                                <h3>All Notes</h3>
                                <button className="btn btn-gold">
                                    <Plus size={16} />
                                    New Note
                                </button>
                            </div>

                            <div className="search-input">
                                <Search className="search-icon" size={16} />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search notes..."
                                />
                            </div>
                        </div>

                        <div className="card-body notes-scroll">
                            {filteredNotes.length > 0 ? (
                                filteredNotes.map((note) => (
                                    <div
                                        key={note.id}
                                        className={`note-item ${selectedNote?.id === note.id ? "active" : ""
                                            }`}
                                        onClick={() => {
                                            setSelectedNote(note);
                                            setIsEditing(false);
                                        }}
                                    >
                                        <div className="note-item-top">
                                            <h4>{note.title}</h4>
                                            {note.isPublic ? (
                                                <Eye size={16} className="icon-public" />
                                            ) : (
                                                <EyeOff size={16} className="icon-private" />
                                            )}
                                        </div>

                                        <p className="client">{getClientName(note.clientId)}</p>
                                        <p className="excerpt">{note.content}</p>

                                        <div className="note-footer">
                                            <span className="date">{format(note.createdAt, "MMM d")}</span>

                                            {note.tags.slice(0, 2).map((tag) => (
                                                <span key={tag} className="tag-badge">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-list">
                                    <FileText size={32} />
                                    <h4>No Notes Yet</h4>
                                    <p>Create your first case note to get started</p>
                                    <button className="btn btn-gold">
                                        <Plus size={16} />
                                        New Note
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side Editor */}
                <div className="notes-details">
                    {selectedNote ? (
                        <div className="card details-card">
                            <div className="card-header details-header">
                                <div>
                                    {isEditing ? (
                                        <input
                                            className="title-input"
                                            defaultValue={selectedNote.title}
                                        />
                                    ) : (
                                        <h2>{selectedNote.title}</h2>
                                    )}

                                    <p className="client-line">
                                        Client: {getClientName(selectedNote.clientId)}
                                    </p>
                                </div>

                                <button
                                    className={`btn ${isEditing ? "btn-gold" : "btn-outline"}`}
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    <Edit2 size={16} />
                                    {isEditing ? "Save" : "Edit"}
                                </button>
                            </div>

                            <div className="details-meta">
                                <span>
                                    <Calendar size={14} /> Created{" "}
                                    {format(selectedNote.createdAt, "MMM d, yyyy")}
                                </span>

                                <span>
                                    <Calendar size={14} /> Updated{" "}
                                    {format(selectedNote.updatedAt, "MMM d, yyyy")}
                                </span>

                                <span className="visibility">
                                    {selectedNote.isPublic ? (
                                        <>
                                            <Eye size={14} />
                                            Shared with client
                                        </>
                                    ) : (
                                        <>
                                            <EyeOff size={14} />
                                            Private
                                        </>
                                    )}
                                </span>
                            </div>

                            <div className="card-body details-body">
                                {isEditing ? (
                                    <textarea
                                        defaultValue={selectedNote.content}
                                        className="editor"
                                        placeholder="Write your case notes here..."
                                    />
                                ) : (
                                    <div className="viewer">{selectedNote.content}</div>
                                )}

                                <div className="tags-section">
                                    <Tag size={16} />
                                    <div className="tags">
                                        {selectedNote.tags.map((tag) => (
                                            <span key={tag} className="tag-gold">
                                                {tag}
                                            </span>
                                        ))}

                                        {isEditing && (
                                            <button className="btn btn-outline btn-small">
                                                <Plus size={12} />
                                                Add Tag
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card empty-card">
                            <div className="card-body empty-state">
                                <div className="empty-icon">
                                    <FileText size={32} />
                                </div>
                                <h3>Select a Note</h3>
                                <p>Choose a note to view or edit its contents.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}