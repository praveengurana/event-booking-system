PGDMP  "                    }            event    17.4    17.4 &    D           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            E           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            F           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            G           1262    16524    event    DATABASE     k   CREATE DATABASE event WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE event;
                     postgres    false            �            1255    16525    update_available_tickets()    FUNCTION     �   CREATE FUNCTION public.update_available_tickets() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Set available_tickets before inserting the row
  NEW.available_tickets := NEW.total_tickets - NEW.booked_tickets;
  RETURN NEW;
END;
$$;
 1   DROP FUNCTION public.update_available_tickets();
       public               postgres    false            �            1255    16526    update_available_tickets1()    FUNCTION     �   CREATE FUNCTION public.update_available_tickets1() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.available_tickets := NEW.total_tickets - NEW.booked_tickets;
  RETURN NEW;
END;
$$;
 2   DROP FUNCTION public.update_available_tickets1();
       public               postgres    false            �            1255    16527    update_event_on_booking()    FUNCTION     �  CREATE FUNCTION public.update_event_on_booking() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Reduce available_tickets and increase booked_tickets when a booking is inserted
    UPDATE events
    SET 
        available_tickets = available_tickets - NEW.tickets_booked,
        booked_tickets = booked_tickets + NEW.tickets_booked
    WHERE id = NEW.event_id;

    RETURN NEW;
END;
$$;
 0   DROP FUNCTION public.update_event_on_booking();
       public               postgres    false            �            1255    16528    update_event_on_cancel()    FUNCTION     �  CREATE FUNCTION public.update_event_on_cancel() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Increase available_tickets, decrease booked_tickets when a booking is deleted
    UPDATE events
    SET 
        available_tickets = available_tickets + OLD.tickets_booked,
        booked_tickets = booked_tickets - OLD.tickets_booked
    WHERE id = OLD.event_id;

    RETURN OLD;
END;
$$;
 /   DROP FUNCTION public.update_event_on_cancel();
       public               postgres    false            �            1259    16529    booked_events    TABLE       CREATE TABLE public.booked_events (
    id integer NOT NULL,
    customer_id integer NOT NULL,
    event_name character varying(255) NOT NULL,
    category character varying(100),
    event_date date NOT NULL,
    event_time time without time zone NOT NULL,
    location character varying(255),
    price numeric(10,2) NOT NULL,
    booking_date date DEFAULT CURRENT_DATE NOT NULL,
    status character varying(50) DEFAULT 'Confirmed'::character varying NOT NULL,
    event_id integer,
    tickets_booked integer NOT NULL
);
 !   DROP TABLE public.booked_events;
       public         heap r       postgres    false            �            1259    16536    booked_events_id_seq    SEQUENCE     �   CREATE SEQUENCE public.booked_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.booked_events_id_seq;
       public               postgres    false    217            H           0    0    booked_events_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.booked_events_id_seq OWNED BY public.booked_events.id;
          public               postgres    false    218            �            1259    16537    events    TABLE     �  CREATE TABLE public.events (
    id integer NOT NULL,
    event_name character varying(255),
    event_type character varying(50),
    venue character varying(255),
    price numeric(10,2),
    date date,
    "time" time without time zone,
    organiser_id integer,
    total_tickets integer DEFAULT 50 NOT NULL,
    booked_tickets integer DEFAULT 0,
    available_tickets integer,
    image_url text
);
    DROP TABLE public.events;
       public         heap r       postgres    false            �            1259    16544    events_id_seq    SEQUENCE     �   CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.events_id_seq;
       public               postgres    false    219            I           0    0    events_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;
          public               postgres    false    220            �            1259    16545    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    full_name character varying(255),
    email character varying(255),
    password character varying(255),
    phone character varying(10),
    user_type character varying(50)
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16550    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    221            J           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    222            �           2604    16551    booked_events id    DEFAULT     t   ALTER TABLE ONLY public.booked_events ALTER COLUMN id SET DEFAULT nextval('public.booked_events_id_seq'::regclass);
 ?   ALTER TABLE public.booked_events ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217            �           2604    16552 	   events id    DEFAULT     f   ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);
 8   ALTER TABLE public.events ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219            �           2604    16553    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221            <          0    16529    booked_events 
   TABLE DATA           �   COPY public.booked_events (id, customer_id, event_name, category, event_date, event_time, location, price, booking_date, status, event_id, tickets_booked) FROM stdin;
    public               postgres    false    217   Y3       >          0    16537    events 
   TABLE DATA           �   COPY public.events (id, event_name, event_type, venue, price, date, "time", organiser_id, total_tickets, booked_tickets, available_tickets, image_url) FROM stdin;
    public               postgres    false    219   4       @          0    16545    users 
   TABLE DATA           Q   COPY public.users (id, full_name, email, password, phone, user_type) FROM stdin;
    public               postgres    false    221   �;       K           0    0    booked_events_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.booked_events_id_seq', 251, true);
          public               postgres    false    218            L           0    0    events_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.events_id_seq', 59, true);
          public               postgres    false    220            M           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 14, true);
          public               postgres    false    222            �           2606    16555     booked_events booked_events_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.booked_events
    ADD CONSTRAINT booked_events_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.booked_events DROP CONSTRAINT booked_events_pkey;
       public                 postgres    false    217            �           2606    16557    events events_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.events DROP CONSTRAINT events_pkey;
       public                 postgres    false    219            �           2606    16559 #   booked_events unique_customer_event 
   CONSTRAINT     i   ALTER TABLE ONLY public.booked_events
    ADD CONSTRAINT unique_customer_event UNIQUE (customer_id, id);
 M   ALTER TABLE ONLY public.booked_events DROP CONSTRAINT unique_customer_event;
       public                 postgres    false    217    217            �           2606    16561    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    221            �           2620    16562 -   booked_events trigger_update_event_on_booking    TRIGGER     �   CREATE TRIGGER trigger_update_event_on_booking AFTER INSERT ON public.booked_events FOR EACH ROW EXECUTE FUNCTION public.update_event_on_booking();
 F   DROP TRIGGER trigger_update_event_on_booking ON public.booked_events;
       public               postgres    false    225    217            �           2620    16563 ,   booked_events trigger_update_event_on_cancel    TRIGGER     �   CREATE TRIGGER trigger_update_event_on_cancel BEFORE DELETE ON public.booked_events FOR EACH ROW EXECUTE FUNCTION public.update_event_on_cancel();
 E   DROP TRIGGER trigger_update_event_on_cancel ON public.booked_events;
       public               postgres    false    226    217            �           2620    16565 '   events update_available_tickets_trigger    TRIGGER     �   CREATE TRIGGER update_available_tickets_trigger AFTER INSERT OR UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_available_tickets();
 @   DROP TRIGGER update_available_tickets_trigger ON public.events;
       public               postgres    false    219    223            �           2620    16566 (   events update_available_tickets_trigger1    TRIGGER     �   CREATE TRIGGER update_available_tickets_trigger1 AFTER INSERT OR UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_available_tickets1();
 A   DROP TRIGGER update_available_tickets_trigger1 ON public.events;
       public               postgres    false    224    219            �           2620    16567 (   events update_available_tickets_trigger2    TRIGGER     �   CREATE TRIGGER update_available_tickets_trigger2 BEFORE INSERT ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_available_tickets();
 A   DROP TRIGGER update_available_tickets_trigger2 ON public.events;
       public               postgres    false    223    219            �           2620    16568 (   events update_available_tickets_trigger3    TRIGGER     �   CREATE TRIGGER update_available_tickets_trigger3 BEFORE INSERT ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_available_tickets();
 A   DROP TRIGGER update_available_tickets_trigger3 ON public.events;
       public               postgres    false    219    223            �           2606    16569 )   booked_events booked_events_event_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.booked_events
    ADD CONSTRAINT booked_events_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id);
 S   ALTER TABLE ONLY public.booked_events DROP CONSTRAINT booked_events_event_id_fkey;
       public               postgres    false    4768    219    217            �           2606    16574    booked_events fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.booked_events
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.users(id) ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.booked_events DROP CONSTRAINT fk_customer;
       public               postgres    false    4770    221    217            <   �   x�u�K
�0����*����6A�ԎDA�NB%�&%p��>�~>�5����t�l��bN��&$������a���1o�����SH&���\|X�@���/݁v�9�5e����o���V�/>�H;S�I�j��E�!��m5�      >   �  x��X�N��}.��O�fRW��7:�/��9h@=:G#�*v�1���7H�~vٹ�yk� �x���Z{���sv�2�ˮBMU�m�\Ww�SkҼ�!"�-ƈb*B�D"�����7_��m��n��ms���K����ۤ�-�}�'}ѕ�|g2��*W�tѓ�s���t�7m�l�Mٖ!�8�1U������ku�n_����t��mZ�t��j��w����u|������RD�;�=�q���U96Y�I�$yo\X�Mk��$e�$a�孩�fc*�6i�:̝���i���Q,8�Y��v��]U7�!_�o�W[��g�C����uEZ��Ť^��=ω����z��j�����o�z���ٕ���4����ՏC3t^��^�VL��屈�s5�KQ?��7o0����.�%�a���0<���G(�/4��hHmF�-Mmm,�"q��Ȧ]2���ejSdP�c�ry��a�2W�!֑#d>0�s�8>&����^��c�)?�U�.��Ѫk��6z�	P��fe��6����� >�/���D�l�/a����1hZ�$�X�X1c��HF<�c�U�B�5�o�n��D����-�߭���dW�9]�v+��d�Ա21DcusďO���bŶ�� "��ۮ
�y�8{�����v`U#��$j�؇I04(w4+J�@�B�E���*.lb�g�:��MFڴ9�B�6f�������/���+im��qf<�]�l�.�[�vx�Τ��dxn��NyĉX��R�D*��q�5#�r�q�$9mxsX�A�{����I��Ӯ�n���{��;ة-��t�Q���8|1
.��xR�!�I�_��}g���#A��ѰV.&��\>��Q�O֜�	*a��q=�Y��뙈�(e�Q�q/l���R��ۻ~ e G�	���]|?�Σ3��� �zd'�#R���t��(�4��)ˈ2��֑��pI�:�����áテ9�nm�����ۍ��Λk��Ε0�#i����t��˳�����Ϝ¢�+Woߋ*Gi��$�����x0H5�?�Oz�^��6*>�"O�h��<|����ƚ@�al�v����G<�+ ̰�:��o��#�����s�0�������������!����?�ͥR��z@��L=_�I9/�9�g�H��w�\5�4���B[����l����\��`6i��������7��h���J�kB,0p�KӍiB[ �Mk���1�ۗq�$����E{Q�u�|x��1{򩤱��f��#��5<Ac���Dm��dB�M�s	!�`IHāV�Zl�a.T�Ie?p)�T�mbvՄ^����dr�G�ed���%ԁ�²��y�l���Uڥ�OH54��q�ӗ��Q!��e�'[۞"�є�Sd%�?]<��I����ǧ��%�)a�Ѓ�!E��a$"�+� �aͥ,�/��b�C�k�j������������H�th/ M��:��3��8�aJ��yqտ�����]����in�=ؼ�aZ�e*��H�����*�󬖋e�n�_YXħGS�]��)�����	^4�Cì6�N��z�Q�5xΨF}�{1��|�fo���	�3�U��ѿ�.OM�2��Y�8[�ybC�+���b$?Gy�5��;o�7Sl!�Z������>� y�����8��û��DV������Y瑡�B�/?�LQ�e���%�e;X�lh��K6H���l �c��#v��؅���0�n\V��bS�3�^;�v#v������b�������y#m���,�A�"ϳq��ߡ����X>�"|�H:h��<�{o�qa�A�kk|�Hu�V�[9R[]\����;�ˡ�t?��?��@����t=��L��2��Mc��ןh�e��o+K!��>_��}{ss���6m      @   �   x����j�0���S�	J�$�}����λ��$�c;�u{�9�6<����~و�+�MkW>G��V=���p�f����xJv�mj�*8�p�VS�!�X��NYF&�iE'U��/ԣ?Y�a�J����۲�F�a�]ox�p�v^��I)��m�k���ք�o� $�6��xw�
��ݙ�'ك30#����+3�Ð�M�X�p�.�~�)ܑ���ƞ��s�c:Ht��SWt�)сR�\�Vd#�EQ|#�H     