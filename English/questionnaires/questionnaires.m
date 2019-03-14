%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% QUESTIONNAIRE ANALYSIS FOR GENE EXPERIMENT %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Marion Rouault Tricia Seow
% query from data base + analysis together
% NB. query separately from task data.

%%%%%%%%%%%% QUERY TEMPLATES
% SELECT  `subject_id`, `label` , `rating` FROM  `databasename`  WHERE `label` IN ('depress','social','iq','ocir','bis','anxiety','schizo','apathy','eat','alcohol')
% AND `trial_type` IN ( 'survey-likert', 'survey-multi-choice') ORDER BY subject_id ASC , time_elapsed ASC


% csv: subject id, questionaire label, responses
clear all

qns = parseqn('databasename.csv',inf); %last element is number of rows

blocksize = size(qns);

splitblocks= mat2cell(qns, 14*ones (blocksize(1)/14,1), blocksize(2));


nSub = length(splitblocks);
nQn = size(splitblocks{1},1);
fileNum = nSub;

for subj = 1:nSub
    
    qna{subj}.id = splitblocks{subj}{1}; % subject id for each block of answers
    
    % ----------- withinsubject sorting by questionnaires -----------
    
    
    for a = 1: nQn %% for zung, bis, ocir and anxiety
        
        if strcmp(splitblocks{subj}(a,2),'"depress"')
            zung = splitblocks{subj}(a,2:end);
        end
        
        if strcmp(splitblocks{subj}(a,2),'"bis"')
            bis =  splitblocks{subj}(a,2:end);
        end
        
        if strcmp(splitblocks{subj}(a,2),'"ocir"')
            ocir =  splitblocks{subj}(a,2:end);
        end
        
        if strcmp(splitblocks{subj}(a,2),'"anxiety"')
            anxiety =  splitblocks{subj}(a,2:end);
        end
        
        if strcmp(splitblocks{subj}(a,2),'"apathy"')
            apathy =  splitblocks{subj}(a,2:end);
        end
        
        if strcmp(splitblocks{subj}(a,2),'"eat"')
            eat =  splitblocks{subj}(a,2:end);
        end
        
        if strcmp(splitblocks{subj}(a,2),'"alcohol"')
            alcohol =  splitblocks{subj}(a,2:end);
        end
        
    end
    
    
    for b = 1: nQn %% for schizo
        
        if strcmp(splitblocks{subj}(b,2),'"schizo"')
            schizo1 = splitblocks{subj}(b,2:end);
            schizo2 = splitblocks{subj}(b+1,2:end);
            break;
        end
        
    end
    
    
    for c = 1: nQn %% for leb
        if strcmp(splitblocks{subj}(c,2),'"social"')
            leb1 = splitblocks{subj}(c,2:end);
            leb2 =  splitblocks{subj}(c+1,2:end);
            break;
        end
    end
    
    
    for d = 1:  nQn  %% for iq
        
        if strcmp(splitblocks{subj}(d,2),'"iq"')
            iq1 =splitblocks{subj}(d,2:end);
            iq2 = splitblocks{subj}(d+1,2:end);
            iq3 = splitblocks{subj}(d+2,2:end);
            break;
        end
        
    end
    
    % -------- Proper Scoring --------
    clear bis_a zung_a leb1_a leb2_a ocir_a iq1_a iq2_a iq3_a anxiety_a schizo1_a schizo2_a apathy_a eat_a alcohol_a
    
    
    %% BIS RAW
    for e = 2:31 % for bis
        bisraw=bis(e);
        [~,bisans] = strtok(bisraw,':');
        bis_a(e-1,:) = bisans{1}(4);
        
    end
    
    bis_a = str2num(bis_a);
    
    
    %% BIS SCORING
    bisrevitems = [1 7 8 9 10 12 13 15 20 29 30];
    
    for bis_rev = 1: length(bisrevitems)
        bis_qns(bisrevitems(bis_rev)) = 5 - bis_a(bisrevitems(bis_rev));
        bis_a(bisrevitems(bis_rev)) = 0;
    end
    
    bis_total = bis_qns+bis_a';
    % first order
    bis_atten = [ 11 28 5 9 20 ];
    bis_atten_s = sum(bis_total(bis_atten));
    
    bis_motrimpul = [17 19 22 3 2 25 4];
    bis_motrimpul_s = sum(bis_total(bis_motrimpul));
    
    bis_selftrl = [ 12 1 8 7 13 14];
    bis_selftrl_s = sum(bis_total(bis_selftrl));
    
    bis_cogcompl = [15 29 10 27 18];
    bis_cogcompl_s = sum(bis_total(bis_cogcompl));
    
    bis_persev = [21 16 30 23];
    bis_persev_s = sum(bis_total(bis_persev));
    
    bis_coginsta = [26 6 24];
    bis_coginsta_s = sum(bis_total(bis_coginsta));
    
    % second order
    bis_attenimpul = bis_atten_s + bis_coginsta_s;
    bis_motorimpul = bis_motrimpul_s + bis_persev_s;
    bis_nonplanimpul = bis_selftrl_s + bis_cogcompl_s;
    
    bis_s = bis_attenimpul + bis_motorimpul + bis_nonplanimpul;
    
    %% OCIR RAW
    for f = 2:20 % for ocir
        
        ocirraw=ocir(f);
        [~,ocirans] = strtok(ocirraw,':');
        ocir_a(f-1,:) = ocirans{1}(4);
        
    end
    
    ocir_a = str2num(ocir_a);
    catchqn = ocir_a([12]); % number 12 is the catch question, maybe save this data too later
    ocir_a = ocir_a([1:11 13:19]);
    
    if catchqn ~= 2
        disp(['Subject ',num2str(splitblocks{subj}{1}),' missed catch item'])
    end
    
    %% OCIR SCORING
    ocir_qns=(ocir_a-1)';
    ocir_s=sum(ocir_qns);
    
    %% ZUNG RAW
    
    for g = 2:21 % for zung
        
        zungraw=zung(g);
        [~,zungans] = strtok(zungraw,':');
        zung_a(g-1,:) = zungans{1}(4);
        
    end
    
    zung_a = str2num(zung_a);
    
    %% ZUNG SCORING
    
    zung_revitems = [2 5 6 11 12 14 16 17 18 20];
    for zung_rev = 1: length(zung_revitems)
        zung_qns(zung_revitems(zung_rev)) = 5 - zung_a(zung_revitems(zung_rev));
        zung_a(zung_revitems(zung_rev)) = 0;
    end
    
    zung_s = sum(zung_a'+zung_qns);
    
    %% SCHIZO RAW
    for h = 2:24 % for schizo
        
        schizoraw1=schizo1(h);
        [~,schizo1ans] = strtok(schizoraw1,':');
        schizo1_a(h-1,:) = schizo1ans{1}(4);
        
    end
    
    for i = 2:21
        
        schizoraw2=schizo2(i);
        [~,schizo2ans] = strtok(schizoraw2,':');
        schizo2_a(i-1,:) = schizo2ans{1}(4);
        
    end
    schizo1_a = str2num(schizo1_a);
    schizo2_a = str2num(schizo2_a);
    
    schizo_a = [schizo1_a;schizo2_a];
    
    
    %% SCHIZO SCORING
    
    schizo_qns = schizo_a-1;
    schizo_qns1=zeros(1,43);
    schizo_revitems = [26 27 28 30 31 34 37 39];
    for schizo_rev = 1: length(schizo_revitems)
        schizo_qns1(:,schizo_revitems(schizo_rev)) = 1 - schizo_qns(schizo_revitems(schizo_rev));
        schizo_qns(schizo_revitems(schizo_rev)) = 0;
    end
    
    schizo_total=schizo_qns1+schizo_qns';
    schizo_unuslexp = sum(schizo_total(1:12));
    schizo_cogdisorg = sum(schizo_total(13:23));
    schizo_introanhed = sum(schizo_total(24:33));
    schizo_impulnoncon = sum(schizo_total(34:43));
    
    schizo_s = sum(schizo_total);
    
    %% anxiety RAW
    
    for j = 2:21 % for anxiety
        
        anxietyraw=anxiety(j);
        [~,anxietyans] = strtok(anxietyraw,':');
        anxiety_a(j-1,:) = anxietyans{1}(4);
        
    end
    
    anxiety_a = str2num(anxiety_a);
    
    anxiety_revitems = [1 3 6 7 10 13 14 16 19];
    
    anxiety_qns=zeros(1,20);
    for anxiety_rev = 1: length(anxiety_revitems)
        anxiety_qns(anxiety_revitems(anxiety_rev)) = 5 - anxiety_a(anxiety_revitems(anxiety_rev));
        anxiety_a(anxiety_revitems(anxiety_rev)) = 0;
    end
    
    
    %% ANXIETY SCORING
    anxiety_s = sum(anxiety_a'+ anxiety_qns);
    
    %% LEB RAW
    for k = 2:25 % for leb
        
        lebraw1=leb1(k);
        [~,leb1ans] = strtok(lebraw1,':');
        leb1_a(k-1,:) = leb1ans{1}(4);
        
    end
    
    
    for l = 2:25
        
        lebraw2=leb2(l);
        [~,leb2ans] = strtok(lebraw2,':');
        leb2_a(l-1,:) = leb2ans{1}(4);
        
    end
    
    leb1_a= str2num(leb1_a);
    leb2_a= str2num(leb2_a);
    leb_a = [leb1_a; leb2_a];
    
    %% LEB SCORING
    leb_qns = leb_a-1;
    leb_s = sum(leb_qns);
    
    y=1;
    x=2;
    for z= 1:24
        leb_qns_avg(z,:) = (leb_qns(y,:)+leb_qns(x,:))/2;
        y = y+2;
        x= x+ 2;
    end
    
    %% IQ RAW
    
    for m = 2:9
        
        iqraw1=iq1(m);
        [~,iq1ans] = strtok(iqraw1,':');
        iq1_a(m-1,:) = iq1ans{1}(4);
        
    end
    
    for n = 2:5
        
        iqraw2=iq2(n);
        [~,iq2ans] = strtok(iqraw2,':');
        iq2_a(n-1,:) = iq2ans{1}(4);
        
    end
    
    for o = 2:5
        
        iqraw3=iq3(o);
        [~,iq3ans] = strtok(iqraw3,':');
        iq3_a(o-1,:) = iq3ans{1}(4);
        
    end
    
    iq1_a= str2num(iq1_a);
    iq2_a= str2num(iq2_a);
    iq3_a= str2num(iq3_a);
    
    iq_a = [iq1_a; iq2_a; iq3_a];
    
    %% IQ SCORING
    
    iq_ans = [4 4 4 6 6 3 4 4 5 2 2 4 3 2 6 7]';
    iq_s = sum(iq_ans==iq_a);
    
    
    
    %% ALCOHOL RAW
    
    for z=2:11
        alcoholraw=alcohol(z);
        [~,alcoholans]=strtok(alcoholraw,':');
        alcohol_a(z-1,:) = alcoholans{1}(4);
    end
    
    alcohol_a= str2num(alcohol_a);
    alcohol_a=alcohol_a-1;
    
    
    for y =9:10
        
        if alcohol_a(y,:)==1
            alcohol_a(y,:)=2;
        elseif alcohol_a(y,:)==2
            alcohol_a(y,:)=4;
        end
        
    end
    
    alcohol_s=sum(alcohol_a);
    
    
    %% EAT RAW
    
    for x=2:27
        
        eatraw=eat(x);
        [~,eatans]=strtok(eatraw,':');
        eat_a(x-1,:)=eatans{1}(4);
    end
    
    eat_a=str2num(eat_a);
    eat_qns=zeros(26,1);
    eat_qns(25,:) = eat_a(25,:)-3;
    eat_a = 4 - eat_a;
    eat_a(25,:) = 0;
    eat_a=eat_a+eat_qns;
    eat_a(eat_a<0)=0;
    
    eat_s=sum(eat_a);
    
    eat_diet = [ 1 6 7 10 11 12 14 16 17 22 23 24 25];
    eat_diet_s = sum(eat_a(eat_diet));
    
    eat_bulimia = [3 4 9 18 21 26];
    eat_bulimia_s = sum(eat_a(eat_bulimia));
    
    eat_oral = [2 5 8 13 15 19 20];
    eat_oral_s = sum(eat_a(eat_oral));
    
    
    %% APATHY RAW
    
    
    for w=2:19
        apathyraw=apathy(w);
        [~,apathyans]=strtok(apathyraw,':');
        apathy_a(w-1,:)=apathyans{1}(4);
    end
    
    %apathy is coded so higher number means higher apathy, so reverse score the
    %entire thing except for qn 6, 10 and 11
    apathy_a = str2num(apathy_a);
    apathy_revitems = [1 2 3 4 5 7 8 9 12 13 14 15 16 17 18];
    
    apathy_qns=zeros(1,18);
    for apathy_rev = 1: length(apathy_revitems)
        apathy_qns(apathy_revitems(apathy_rev)) = 5 - apathy_a(apathy_revitems(apathy_rev));
        apathy_a(apathy_revitems(apathy_rev)) = 0;
    end
    
    apathy_s = sum(apathy_a'+ apathy_qns);
    

    %%subject
    qna{subj}.catchqn = catchqn;
    qna{subj}.zung.raw = zung_a'+zung_qns;
    qna{subj}.iq.raw = iq_a;
    qna{subj}.leb.raw.all= leb_qns;
    qna{subj}.leb.raw.avg = leb_qns_avg;
    qna{subj}.ocir.raw = ocir_qns;
    qna{subj}.schizo.raw = schizo_total;
    qna{subj}.bis.raw = bis_total;
    qna{subj}.anxiety.raw = anxiety_a'+anxiety_qns;
    qna{subj}.alcohol.raw = alcohol_a;
    qna{subj}.eat.raw = eat_a;
    qna{subj}.apathy.raw = apathy_a'+ apathy_qns;
    
    
    qna{subj}.bis.score.total = bis_s;
    qna{subj}.bis.score.firstord.atten =bis_atten_s;
    
    qna{subj}.bis.score.firstord.mtrimpul =bis_motrimpul_s;
    qna{subj}.bis.score.firstord.selfctrl =bis_selftrl_s;
    qna{subj}.bis.score.firstord.cogcompl =bis_cogcompl_s ;
    qna{subj}.bis.score.firstord.persev = bis_persev_s;
    qna{subj}.bis.score.firstord.coginsta = bis_coginsta_s;
    
    qna{subj}.bis.score.secondord.attenimpul = bis_attenimpul;
    qna{subj}.bis.score.secondord.motorimpul = bis_motorimpul;
    qna{subj}.bis.score.secondord.nonplanimpul = bis_nonplanimpul;
    
    qna{subj}.schizo.score.total = schizo_s;
    qna{subj}.schizo.score.unuslexp = schizo_unuslexp;
    qna{subj}.schizo.score.cogdisorg  = schizo_cogdisorg;
    qna{subj}.schizo.score.introanhed = schizo_introanhed;
    qna{subj}.schizo.score.impulnoncon  = schizo_impulnoncon;
    
    qna{subj}.leb.score = leb_s;
    qna{subj}.ocir.score = ocir_s;
    qna{subj}.zung.score = zung_s;
    qna{subj}.iq.score = iq_s;
    qna{subj}.anxiety.score= anxiety_s;
    qna{subj}.alcohol.score=alcohol_s;
    qna{subj}.apathy.score=apathy_s;
    
    qna{subj}.eat.score.total=eat_s;
    qna{subj}.eat.score.oral=eat_oral_s;
    qna{subj}.eat.score.bulimia=eat_bulimia_s;
    qna{subj}.eat.score.diet=eat_diet_s;
    
end

save(['qna' num2str(fileNum) '.mat'], 'qna');


