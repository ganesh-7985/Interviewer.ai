'use client';
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/Gemini_model";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function NewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState('');
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const InputPrompt = `job position: ${jobPosition}, job description: ${jobDesc}, job experiences: ${jobExperience}, depending on above information give me 5 interview questions and answers in json format, give question and answer as fields in json`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const textResult = result.response.text();
            const MockInterviewResponse = textResult.replace('```json', '').replace('```', '');
            setJsonResponse(MockInterviewResponse);

            if (MockInterviewResponse && isLoaded && user?.primaryEmailAddress?.emailAddress) {
                const resp = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonMockResp: MockInterviewResponse,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user.primaryEmailAddress.emailAddress,
                    createdAt: moment().format(),
                }).returning({ mockId: MockInterview.mockId });

                console.log("Inserted ID: ", resp);
                if (resp) {
                    setOpenDialog(false);
                    router.push('/dashboard/interview/' + resp[0]?.mockId)
                }
            } else {
                console.error("User data is not loaded properly or MockInterviewResponse is empty.");
            }
        } catch (error) {
            console.error("Error during submission: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-10 border rounded-lg bg-slate-500 hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>
                <h1 className='font-bold text-center text-lg'> + </h1>
                <h2 className='font-bold text-center text-lg'>Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle className='text-white'>Tell us more about your job</DialogTitle>
                        <DialogDescription className='text-white'>
                            <form onSubmit={onSubmit}>
                                Add details about the job Position, Description and job Experience.
                                <div className="mt-6 my-4">
                                    <label>Job Position</label>
                                    <Input
                                        required
                                        placeholder="Ex. AI Developer"
                                        value={jobPosition}
                                        onChange={(event) => setJobPosition(event.target.value)}

                                    />
                                </div>
                                <div className="mt-6 my-4">
                                    <label>Job Description</label>
                                    <Textarea
                                        required
                                        placeholder="Ex. Develop AI solutions..."
                                        value={jobDesc}
                                        onChange={(event) => setJobDesc(event.target.value)}
                                    />
                                </div>
                                <div className="mt-6 my-4">
                                    <label>Experience</label>
                                    <Input
                                        required
                                        type="number"
                                        placeholder="Ex. 5 years"
                                        value={jobExperience}
                                        onChange={(event) => setJobExperience(event.target.value)}
                                    />
                                </div>
                                <div className="flex gap-5 justify-end">
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? <><LoaderCircle className="animate-spin" /> Generating from AI</> : 'Start Interview'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default NewInterview;