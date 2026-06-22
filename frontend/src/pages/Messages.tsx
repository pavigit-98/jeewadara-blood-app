import React from 'react';
import { Search, Phone, Video, Paperclip, Send, FileText, Navigation } from 'lucide-react';

interface MessagesProps {
  chats: Record<string, { sender: string; text: string; time: string; doc?: string }[]>;
  activeChatContact: string;
  setActiveChatContact: (val: string) => void;
  chatInput: string;
  setChatInput: (val: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onSendAttachment: (contact: string, text: string, doc: string) => void;
}

export const Messages: React.FC<MessagesProps> = ({
  chats,
  activeChatContact,
  setActiveChatContact,
  chatInput,
  setChatInput,
  onSendMessage,
  onSendAttachment
}) => {
  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col md:flex-row bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
      
      {/* Chats List Sidebar */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200 shrink-0">
          <h3 className="font-bold text-slate-800 text-base">Clinical Communication</h3>
          <div className="relative mt-3">
            <span className="absolute left-3 top-2.5 text-slate-400" aria-hidden="true"><Search className="w-3.5 h-3.5" /></span>
            <input 
              type="text" 
              placeholder="Search discussions..." 
              className="w-full pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-lg text-xs placeholder-slate-400 focus:outline-none"
              aria-label="Search messaging contacts"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {Object.keys(chats).map((contact) => {
            const cMsgs = chats[contact];
            const lastMsg = cMsgs[cMsgs.length - 1];
            return (
              <div 
                key={contact}
                onClick={() => setActiveChatContact(contact)}
                className={`p-3 rounded-xl cursor-pointer transition flex justify-between gap-2 items-start ${activeChatContact === contact ? 'bg-slate-100 font-bold' : 'hover:bg-slate-50'}`}
              >
                <div className="flex gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded bg-slate-200 flex items-center justify-center font-bold text-slate-600 shrink-0 uppercase" aria-hidden="true">
                    {contact.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs text-slate-800 block truncate">{contact}</span>
                    <span className="text-[10px] text-slate-400 font-medium block truncate mt-0.5">{lastMsg?.text || 'File shared.'}</span>
                  </div>
                </div>
                <span className="text-[8px] text-slate-400 shrink-0 font-bold uppercase">{lastMsg?.time || 'Now'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Chat Conversation window */}
      <div className="flex-1 flex flex-col bg-slate-50">
        <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center font-extrabold text-jeeva-navy shrink-0" aria-hidden="true">
              {activeChatContact.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">{activeChatContact}</h4>
              <span className="text-[10px] text-green-600 font-semibold flex items-center gap-1">● Direct Channel • Online</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 transition focus:outline-none"><Phone className="w-4 h-4" /></button>
            <button className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 transition focus:outline-none"><Video className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* LIVE VEHICLE COURIER PROGRESS CARD - screenshot high fidelity match */}
          {activeChatContact === 'City General Blood Bank' && (
            <section className="max-w-md mx-auto bg-jeeva-navy text-white rounded-2xl shadow-xl overflow-hidden border border-white/10 animate-pulse-slow" aria-labelledby="courierStatusHeading">
              <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                <span id="courierStatusHeading" className="text-[10px] font-bold tracking-wider uppercase text-white/60">Live Status • REQ-882</span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-bounce" aria-hidden="true"></span>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <span className="text-[9px] font-bold text-white/50 uppercase tracking-wide block">Asset Type</span>
                    <span className="text-sm font-extrabold block mt-1">O Positive (O+)</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-white/50 uppercase tracking-wide block">Quantity</span>
                    <span className="text-sm font-extrabold block mt-1">4 Units</span>
                  </div>
                </div>

                {/* Transit Progress Bar fill */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-white/50 mb-1">
                    <span>Transit Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden" aria-hidden="true">
                    <div className="bg-jeeva-red h-full rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 text-[10px] font-bold text-white/80">
                  <Navigation className="w-4 h-4 text-jeeva-orange shrink-0 animate-bounce" />
                  <span>Vehicle ID: MED-TRANS-04 (En route)</span>
                </div>
              </div>
            </section>
          )}

          {/* Conversation messages */}
          {chats[activeChatContact]?.map((msg, i) => (
            <div 
              key={i} 
              className={`flex flex-col max-w-[70%] ${msg.sender === 'You' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-xs ${msg.sender === 'You' ? 'bg-jeeva-navy text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'}`}>
                {msg.text}
                
                {msg.doc && (
                  <div className="mt-3 p-3 bg-white/10 border border-white/20 rounded-xl flex items-center gap-3 text-white text-[11px] font-bold uppercase" aria-label={`Shared file ${msg.doc}`}>
                    <FileText className="w-5 h-5 text-jeeva-orange shrink-0" />
                    <span>{msg.doc}</span>
                  </div>
                )}
              </div>
              <span className="text-[8px] text-slate-400 font-bold uppercase mt-1 px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Messaging Typing Box */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0 font-sans">
          <form 
            onSubmit={onSendMessage}
            className="flex gap-3"
          >
            <button 
              type="button"
              onClick={() => {
                onSendAttachment(activeChatContact, 'Cross-match laboratory verification certificate uploaded successfully.', 'CrossMatch_Report_882.pdf');
              }}
              className="p-3 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition focus:outline-none"
              aria-label="Attach clinical file document report"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            
            <input 
              type="text" 
              placeholder="Type clinical message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-100 border-none rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-jeeva-navy text-slate-800"
              aria-label="Clinical message input box"
            />

            <button 
              type="submit"
              className="p-3 bg-jeeva-navy hover:bg-jeeva-navy-light text-white rounded-xl transition focus:outline-none"
              aria-label="Send clinical message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};
