import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { BookingProvider } from "@/context/BookingContext";
import { trackPageView } from "@/lib/analytics";

// Import API setup to ensure interceptors are registered
import "@/lib/api";

import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Tours from "./pages/tours";
import TourDetail from "./pages/TourDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <BookingProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/:slug" element={<TourDetail />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BookingProvider>
          </ErrorBoundary>
        </BrowserRouter>

        {/* HTML provided for Live Chat Button and Pane - Converted to valid JSX */}
        {/* This structure is likely managed by an external chat service's JS */}
        {/* Floating Chat Button */}
        <div id="inside_liveChatTab"
          onKeyDown={(event) => {
            if (event && (event.keyCode === 32 || event.keyCode === 13)) {
              // Note: Accessing window.insideFrontInterface might require ensuring the external script is loaded
              // Using optional chaining and checking existence for safety
              if ((window as any).insideFrontInterface && typeof (window as any).insideFrontInterface.keyboardNavigation !== 'undefined'){
                (window as any).insideFrontInterface.keyboardNavigation = true;
              }
              (event.target as HTMLElement).click();
              return false;
            }
          }}
          role="button"
          aria-label="Chat"
          tabIndex={0}
          className="inside_chat_online"
          style={{ display: 'block', opacity: 1, width: '67px', right: '67px' }}
        >
          <img
            className="inside_chatTabImage"
            src="https://eu2-cdn.inside-graph.com/custom/3-Contiki-Electric-Lime-Chat-Tab-AM.svg?1748104561464"
            alt="Live chat icon, click to open the live chat pane."
            style={{ width: 'auto', pointerEvents: 'none' }}
            width={67}
            height={67}
          />
        </div>

        {/* Live Chat Pane Container */}
        <div id="inside_holder" style={{ display: 'none' }} data-device="1" className="chatOpen">
          <div id="orientPhone">
            <img src="https://eu2-cdn.inside-graph.com/images/rotate-device.svg" alt="Please rotate your device" />
            <div id="orientPhoneLabel">Please rotate your device</div>
          </div>
          <div id="chatNotifications" className="style2"></div>
          <div id="insideChatPane" aria-label="Chat Pane" role="dialog" aria-modal="true" aria-labelledby="insideChatPaneHeaderImageWrapper" style={{ borderRadius: '10px', overflow: 'hidden', background: 'rgb(243, 243, 243)', opacity: 1 }} className="workflowActive open footerHidden chatInProgress portrait">
            <div id="insideChatPaneHeader" style={{ backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(0, 0, 0)' }}>
              <h1 id="insideChatPaneHeaderImageWrapper" tabIndex={0} aria-label="Chat Now" style={{ textAlign: 'left', paddingLeft: '20px' }}>
                <span className="imageAlignHelper"></span>
                <img alt="" role="presentation" src="https://eu2-cdn.inside-graph.com/custom/3-contiki-header-black-AM.svg?1748104561464" />
              </h1>
              <div id="insideChatPaneButtons">
                <div style={{ display: 'none' }} id="insideChatPaneBackButton" aria-label="Back to Main Menu" role="button" className="insideChatPaneHeaderButton hasTooltip" tabIndex={0}>
                  <span className="icon-back-rounded"></span>
                  <i className="tooltip">Back to Main Menu</i>
                </div>
                <div id="insideChatPaneMinimiseButton" aria-label="Minimize Chat Pane" role="button" className="insideChatPaneHeaderButton" tabIndex={0}>
                  <span className="icon-minimize-rounded"></span>
                </div>
                <div id="insideChatPaneCloseButton" aria-label="Close Chat Pane" role="button" className="insideChatPaneHeaderButton" tabIndex={0} style={{ display: 'inline-flex' }}>
                  <span className="icon-close-rounded"></span>
                </div>
                <div id="insideChatPaneLeaveShowButton" style={{ display: 'none' }} aria-label="Leave the Show" role="button" className="insideChatPaneHeaderButton" tabIndex={0}>
                  <span className="icon-close" tabIndex={-1}></span>
                </div>
              </div>
            </div>
            <div id="notifications" aria-live="polite"></div>
            <div id="frameNotifications" aria-live="polite" style={{ display: 'none' }}></div>
            <div id="insideChatPaneContent" role="log" aria-live="off">
              <div className="message workflowMessage plain" data-wfid="1093" data-stepid="3655" data-mid="530065533" style={{ display: 'block' }}>
                <div className="messageContent" style={{ transform: 'translateY(0%)' }}>
                  <div className="bubble" tabIndex={0}>
                    <div className="fromImage" style={{ display: 'none' }}>
                      <div className="inside_assistMessageFace">
                        <img role="presentation" alt="" src="https://eu2-cdn.inside-graph.com/custom/3-contikioperatoravatar3.png?1748104561464" />
                      </div>
                    </div>
                    <div className="fromName title"></div>
                    <div className="sr-only">Advisor message</div>
                    <div className="content">
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '14pt' }}><strong>Hey Traveler</strong></span> 👋<br />
                        Got questions about Contiki? We've got answers.<br /><br /><br />
                        <em>By proceeding to chat with us, you&apos;re agreeing to our <a href="https://www.contiki.com/resources/legalstuff?utm_source=insidechat#privacy-policy" target="_blank" tabIndex={0}>Privacy Policy</a> and <a href="https://www.contiki.com/us/en/resources/booking-conditions?utm_source=insidechat" target="_top" tabIndex={0}>Terms of Use</a>.</em>
                      </div>
                    </div>
                  </div>
                  <div className="date small">4 mins ago</div>
                </div>
              </div>
              <div className="message workflowMessage lastOperatorMessage operator fullWidth" data-wfid="1093" data-stepid="3664" data-mid="530065535" style={{ display: 'block' }}>
                <div className="messageContent" style={{ transform: 'translateY(0%)' }}>
                  <div className="bubble" tabIndex={0} role="menu" aria-label="Please select from one of the following:">
                    <div className="fromImage">
                      <div className="inside_assistMessageFace">
                        <img role="presentation" alt="" src="https://eu2-cdn.inside-graph.com/custom/3-contikioperatoravatar3.png?1748104561464" />
                      </div>
                    </div>
                    <div className="fromName title">Contiki</div>
                    <div className="sr-only">Advisor message</div>
                    <div className="content">Please select from one of the following:
                      <div className="picklist  vertical " data-fid="1274" data-icon-position="1" data-text-position="3" data-sub-text-position="3" data-option-bubble-size="1">
                        <div className="picklistOptions">
                          <div role="menuitem" className="picklistOption" data-value="1" aria-label="Live Chat" tabIndex={0}>
                            <div className="picklistContent">
                              <div className="text"><span>Live Chat</span></div>
                            </div>
                          </div>
                          <div role="menuitem" className="picklistOption" data-value="3" aria-label="WhatsApp" tabIndex={0}>
                            <div className="picklistContent">
                              <div className="text"><span>WhatsApp</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="date small">4 mins ago</div>
                </div>
              </div>
            </div>
            <div id="insideChatPaneAvatars" aria-label="Animations of avatars reacting to the chat conversation."></div>
            <div id="insideChatPaneFooterBuffer"></div>
            <div id="insideChatPaneFooter" className="inputHidden">
              <div id="unreadMessageIndicator" style={{ display: 'none' }}></div>
              <div id="workflows" style={{ display: 'none' }}></div>
              <div id="insideChatPaneInputFooter" className="hidden avatarAnimationButtonEnabled" style={{ height: '0px', transition: 'height 0.3s' }}>
                <table id="insideChatFooterTable" role="presentation">
                  <tbody>
                    <tr>
                      <td id="chatMenuButtonCell">
                        <div id="chatMenuButton" tabIndex={0} aria-label="Toggle Chat Menu Button" role="button" style={{ display: 'block' }}>
                          <div id="chatMenuIcon" role="button" tabIndex={-1}>
                            <span className="icon-menu-rounded"></span>
                          </div>
                          <div id="chatMenuCloseIcon" tabIndex={-1} className="transitionHidden" aria-label="Close Chat Pane Menu">
                            <span className="icon-close-rounded"></span>
                          </div>
                        </div>
                      </td>
                      <td id="insideWorkflowFieldCell" style={{ display: 'none' }}></td>
                      <td id="chatInputCell">
                        <div id="chatInputWrapper" className="empty">
                          <label id="chatInputLabel" htmlFor="chatInput" tabIndex={-1} className="sr-only">Chat Message</label>
                          <textarea id="chatInput" tabIndex={0} placeholder="Type here ..." aria-label="Chat Input, type here" className="empty" style={{ height: '45px' }}></textarea>
                        </div>
                      </td>
                      <td id="emailInputCell" style={{ display: 'none' }}>
                        <div id="emailInputWrapper">
                          <input tabIndex={0} id="emailInput" autoComplete="off_random" type="email" />
                        </div>
                      </td>
                      <td>
                        <div id="avatarAnimationButton" tabIndex={0} aria-label="Click to access animations for your avatar." role="button" title="Avatar animation" style={{ display: 'block' }}>
                          <span className="icon-avatars-emoji-rounded"></span>
                        </div>
                        <div id="chatSendButton" tabIndex={0} aria-label="Send Chat" role="button" title="Send Chat" className="" style={{ display: 'none' }}>
                          <span className="icon-send-rounded"></span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="disabledChatInputContainer" style={{ display: 'none' }}>
                  <div className="disabledChatInputText thinscroll"></div>
                </div>
              </div>
              <div id="menu_notifications"></div>
              <div id="chatPaneMenu">
                <div id="chatPaneMenuContent" tabIndex={-1} aria-label="Chat Pane Menu">
                  <div className="menuItem" tabIndex={0} role="button" id="endChatItem" aria-label="End Chat">
                    <span className="icon-end-chat-rounded"></span>
                    <label>End<br /> Chat</label>
                  </div>
                  <div className="menuItem" tabIndex={0} role="button" id="requestVideoChat" aria-label="Request Video Chat" style={{ display: 'none' }}>
                    <span className="icon-video-request-rounded"></span>
                    <label>Request Video Chat</label>
                  </div>
                  <div className="menuItem" tabIndex={0} role="button" id="scheduleAppointment" aria-label="Schedule Appointment" style={{ display: 'none' }}>
                    <span className="icon-Schedule-rounded"></span>
                    <label>Schedule Appointment</label>
                  </div>
                  <div className="menuItem" tabIndex={0} role="button" id="printTranscriptItem" aria-label="Print Transcript" style={{ display: 'none' }}>
                    <span className="icon-print-rounded"></span>
                    <label>Print Transcript</label>
                  </div>
                  <div className="menuItem" tabIndex={0} role="button" id="attachFileItem" aria-label="Attach a File" style={{ display: 'none' }}>
                    <span className="icon-attachment-rounded"></span>
                    <label>Attach a File</label>
                  </div>
                  <div className="menuItem" tabIndex={0} role="button" id="chatToHuman" aria-label="Chat to Human" style={{ display: 'none' }}>
                    <span className="icon-chat-to-human-rounded"></span>
                    <label>Chat to Human</label>
                  </div>
                  <div className="menuItem" tabIndex={0} role="button" id="joinTheCallItem" aria-label="Join the Call" style={{ display: 'none' }}>
                    <span className="icon-join-the-call-rounded"></span>
                    <label>Join the Call</label>
                  </div>
                  <div className="menuItem" tabIndex={0} role="button" id="clickToCallItem" aria-label="Click to Call" style={{ display: 'none' }}>
                    <span className="icon-menu-tile-call-me"></span>
                    <label>Click to Call</label>
                  </div>
                  <div className="menuItem" tabIndex={0} role="button" id="leaveAMessageItem" aria-label="Leave a Message" style={{ display: 'none' }} title="Leave a Message">
                    <span className="icon-leave-message-rounded"></span>
                    <label>Leave a Message</label>
                  </div>
                  <div className="menuItem" tabIndex={0} role="button" id="privacyOptOutItem" aria-label="Cookies Opt-out" style={{ display: 'none' }}>
                    <span className="icon-cookie-rounded"></span>
                    <label>Cookies Opt-out</label>
                  </div>
                  <div className="menuItem" tabIndex={0} role="button" id="backToInitialTaskItem" aria-label="Back to Main Menu" style={{ display: 'none' }}>
                    <span className="icon-back-rounded"></span>
                    <label>Back to Main Menu</label>
                  </div>
                  <div className="menuItem" tabIndex={0} role="button" id="toggleAvatarsItem" aria-label="Disable Avatars" style={{ display: 'none' }}>
                    <span className="icon-avatar"></span>
                    <label>Disable Avatars</label>
                  </div>
                </div>
                <div id="chatPaneMenuFooter">
                  <a target="_blank" href="http://www.powerfront.com?utm_source=chat-pane&amp;utm_medium=desktop">
                    {/* <img className='insideBrandAvatarHead' src='https://eu2-cdn.inside-graph.com//images/brand-avatarhead.svg' /> */}
                    <span id="insideBrandingText">Live chat by <span className="powerfrontText">Powerfront<sup>TM</sup></span></span>
                  </a>
                </div>
              </div>
            </div>
            <input type="file" name="inside_attachmentDropperInput" id="inside_attachmentDropperInput" style={{ display: 'none' }} />
            <div className="focusTrap" tabIndex={0}></div>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
